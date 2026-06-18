import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [slug]);

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="blog-post-page">
      <div className="container">
        <article className="blog-post-article">
          <div className="blog-post-meta">
            <Link to="/blog" className="blog-back-link">&larr; Back to Blog</Link>
            <span className="blog-post-date">{post.date}</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.image && (
            <div className="blog-post-featured-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}
          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="blog-post-footer">
            <Link to="/contact" className="blog-cta-button">
              Get Expert Help Today
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
