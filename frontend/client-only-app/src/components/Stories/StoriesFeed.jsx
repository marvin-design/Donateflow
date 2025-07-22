import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios'; 
import { Link } from 'react-router-dom';

const StoryFeed = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get('/api/charity/stories/feed');
        setStories(res.data);
      } catch (err) {
        console.error('Failed to load story feed:', err);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="story-feed">
      <h2>Latest Impact Stories</h2>
      <div className="story-grid">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            {story.photo_url && (
              <img src={story.photo_url} alt={story.title} className="story-image" />
            )}
            <h3>{story.title}</h3>
            <p>{story.content?.slice(0, 100)}...</p>
            <Link to={`/stories/${story.id}`} className="read-more">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryFeed;
