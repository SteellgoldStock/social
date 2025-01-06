# Social Media Data Generator

Generate multilingual mock social data using parallel processing.

## Install
```bash
pip install faker tqdm
```

## Features
- Multi-language users (EN, FR, ES, DE, IT)
- 5 users with 2-20 posts each 
- Nested replies up to 4 levels deep
- DiceBear avatars with custom colors
- Picsum photo banners
- Auto-save every 10 posts
- Threaded generation with 8 workers
- Graceful exit with Ctrl+C

## Usage
```bash
# Generate JSON data
python generate_mock_data.py

# Convert to TypeScript
python json_to_ts.py
```

## Types

### User
```typescript
interface UserProps {
  name: string;
  handle: string; 
  avatar: string;
  banner: string;
  bio: string;
  isVerified: boolean;
  language: 'en' | 'fr' | 'es' | 'de' | 'it';
}
```

### Post/Reply
```typescript
interface PostProps {
  id: string;
  author: UserProps;
  content: string;
  timestamp: string;
  replies: PostProps[];
  likes: number;
  reposts: number;
  isBookmarked: boolean;
  isLiked: boolean;
  isReposted: boolean;
}
```

The generator produces diverse content types:
- Regular text posts 
- Posts with hashtags
- URL shares
- Announcement posts
- Thread starters
- Interactive replies