import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const StoryFeed = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("/api/charity/stories/feed");
        setStories(res.data);
      } catch (err) {
        console.error("Failed to load story feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="story-feed-wrapper">
      <div className="story-feed">
        <h2 className="feed-title">Latest Impact Stories</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading stories...</p>
        ) : stories.length === 0 ? (
          <p className="text-center text-gray-600">No stories available.</p>
        ) : (
          <div className="story-grid">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                {story.photo_url && (
                  <img
                    src={story.photo_url}
                    alt={story.title}
                    className="story-image"
                  />
                )}
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-text">{story.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          
          
        }

        .story-feed-wrapper {
          padding: 48px 0px 24px;
          width: 100%;
          margin: 48px 0px 0px;
        }

        .story-feed {
          background: rgba(255, 255, 255, 0.96);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .feed-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 30px;
          text-align: center;
        }

        .story-grid {
          display: grid;
         grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .story-card {
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .story-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        }

        .story-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .story-content {
          padding: 20px;
        }

        .story-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #f97316;
          margin-bottom: 10px;
        }

        .story-text {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .story-feed-wrapper {
            padding: 20px;
          }

          .story-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StoryFeed;
