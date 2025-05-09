// import {useCallback, useEffect, useState} from 'react';
// import styles from './homePage.module.css';
// import clubImage from '../../assets/club1.png'
// import clubImage1 from '../../assets/club1.png'
// import {useAuthentication} from "../../hooks/AuthenticationContext.tsx";
// import {useParams} from "react-router-dom";
//
//
// enum ContentType {
//     TESTIMONIAL = 'TESTIMONIAL',
//     ARTICLE = 'ARTICLE'
// }
//
// type Feed =  {
//     id: number,
//     type: ContentType,
//     subGroup: string,
//     author: string,
//     title: string,
//     content: string,
//     upvotes: number,
//     comments: number,
//     timePosted: string,
//     image: string
// }
//
// export default function HomePage() {
//     const { filter } = useParams();
//     const {baseUrl} = useAuthentication()
//     const [feeds, setFeeds] = useState<Feed[]>([]);
//     const [nextPageUrl, setNextPageUrl] = useState(`${baseUrl}/api/v1/feeds?filter=${filter}&page=0&size=10`);
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//
//     // Fetch Feeds Function
//     const fetchFeeds = useCallback(async () => {
//         if (!nextPageUrl || isLoading) return;
//
//         setIsLoading(true);
//         try {
//             const response = await fetch(nextPageUrl);
//             const data = await response.json();
//
//             setFeeds((prevFeeds) => [...prevFeeds, ...data._embedded.feedList]);
//             setNextPageUrl(data._links.next?.href || null);
//             setHasMore(!!data._links.next);
//         } catch (error) {
//             console.error('Error fetching feeds:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [nextPageUrl, isLoading]);
//
//     // Intersection Observer for Endless Scrolling
//     const observer = useCallback((node) => {
//         if (isLoading) return;
//
//         const handleObserver = (entries) => {
//             if (entries[0].isIntersecting && hasMore) {
//                 fetchFeeds();
//             }
//         };
//
//         const options = { threshold: 1.0 };
//         const intersectionObserver = new IntersectionObserver(handleObserver, options);
//
//         if (node) intersectionObserver.observe(node);
//
//         return () => {
//             if (node) intersectionObserver.unobserve(node);
//         };
//     }, [fetchFeeds, isLoading, hasMore]);
//
//     useEffect(() => {
//         setNextPageUrl(`${baseUrl}/api/v1/feeds?filter=${filter}&page=0&size=10`);
//         fetchFeeds(); // Initial fetch
//     }, [filter]);
//
//
//
//     return (
//         <div className={styles.homePage}>
//             <div className={styles.feedContainer}>
//                 {/* Sort options bar */}
//                 <div className={styles.sortBar}>
//                     <button className={`${styles.sortButton} ${styles.active}`}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//                         </svg>
//                         Best
//                     </button>
//                     <button className={styles.sortButton}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <polyline points="18 15 12 9 6 15"></polyline>
//                         </svg>
//                         Hot
//                     </button>
//                     <button className={styles.sortButton}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <polyline points="12 6 12 12 16 14"></polyline>
//                         </svg>
//                         New
//                     </button>
//                     <button className={styles.sortButton}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
//                             <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
//                         </svg>
//                         Top
//                     </button>
//                     <div className={styles.sortDropdown}>
//                         <button className={styles.sortButton}>
//                             <span>...</span>
//                         </button>
//                     </div>
//                 </div>
//
//                 {/* Main feed feeds */}
//                 <div className={styles.posts}>
//                     {feeds.map(post => (
//                         <div key={post.id} className={styles.post}>
//                             {/* Vote controls */}
//                             <div className={styles.voteControls}>
//                                 <button className={styles.upvoteButton}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <polyline points="18 15 12 9 6 15"></polyline>
//                                     </svg>
//                                 </button>
//                                 <span className={styles.voteCount}>{post.upvotes}</span>
//                                 <button className={styles.downvoteButton}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                         <polyline points="6 9 12 15 18 9"></polyline>
//                                     </svg>
//                                 </button>
//                             </div>
//
//                             {/* Post content */}
//                             <div className={styles.postContent}>
//                                 <div className={styles.postHeader}>
//                                     <span className={styles.subreddit}>{post.subGroup}</span>
//                                     <span className={styles.postedBy}>Posted by u/{post.author} {post.timePosted}</span>
//                                 </div>
//                                 <h3 className={styles.postTitle}>{post.title}</h3>
//                                 <div className={styles.postText}>{post.content}</div>
//
//                                 {post.image && (
//                                     <div className={styles.postImage}>
//                                         <img src={post.image} alt="Post illustration" />
//                                     </div>
//                                 )}
//
//                                 <div className={styles.postActions}>
//                                     <button className={styles.commentButton}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                                         </svg>
//                                         {post.comments} Comments
//                                     </button>
//                                     <button className={styles.shareButton}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <circle cx="18" cy="5" r="3"></circle>
//                                             <circle cx="6" cy="12" r="3"></circle>
//                                             <circle cx="18" cy="19" r="3"></circle>
//                                             <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
//                                             <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
//                                         </svg>
//                                         Share
//                                     </button>
//                                     <button className={styles.saveButton}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
//                                         </svg>
//                                         Save
//                                     </button>
//                                     <button className={styles.moreButton}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                             <circle cx="12" cy="12" r="1"></circle>
//                                             <circle cx="19" cy="12" r="1"></circle>
//                                             <circle cx="5" cy="12" r="1"></circle>
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     {isLoading && <div className={styles.loader}>Loading...</div>}
//
//                     {/* Trigger for Intersection Observer */}
//                     <div ref={observer} style={{ height: '20px' }} />
//                 </div>
//             </div>
//
//             {/* Right sidebar content */}
//             <div className={styles.sideContent}>
//                 {/* Premium card */}
//                 <div className={styles.card}>
//                     <div className={styles.premiumCard}>
//                         <h3>Emergency Hotline</h3>
//                         <p>Is there an emergency?</p>
//                         <button className={styles.premiumButton}>Call Now</button>
//                     </div>
//                 </div>
//
//                 {/* Communities card */}
//                 <div className={styles.card}>
//                     <div className={styles.communitiesCard}>
//                         <h3>Popular Groups</h3>
//                         <ul className={styles.communityList}>
//                             <li>Peer Support Group</li>
//                             <li>Academic and Career Counseling</li>
//                             <li>Women’s Support Group</li>
//                             <li>Personal Growth and Development</li>
//                             <li>Crisis and Emergency Support Group</li>
//                         </ul>
//                         <button className={styles.seeMoreButton}>See More</button>
//                     </div>
//                 </div>
//
//                 {/* Footer links */}
//                 <div className={styles.footerLinks}>
//                     <div className={styles.linkGroup}>
//                         <a href="#">Help</a>
//                         <a href="#">About</a>
//                         <a href="#">Careers</a>
//                     </div>
//                     <div className={styles.linkGroup}>
//                         <a href="#">Terms</a>
//                         <a href="#">Privacy</a>
//                         <a href="#">Content Policy</a>
//                     </div>
//                     <div className={styles.copyright}>
//                         © 2025 Trackora, Inc. All rights reserved
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }