# Social Media Data Generator

Python scripts to generate mock social media data in multiple languages.

## Installation

```bash
pip install faker tqdm
```

## Scripts

### generate_data.py
Generates random social media data:
- 50 users with profiles (EN, FR, ES, DE, IT)
- 200 posts in user's preferred language
- Up to 100 replies per post
- Up to 20 replies per sub-reply
- Max 4 levels of nested replies
- Auto-saves every 10 posts
- Press Ctrl+C to save and exit

Creates `mock_data.json`

### json_to_ts.py
Converts `mock_data.json` to TypeScript:
- Creates `mockData.ts`
- Adds a `findPost` helper function

## Usage

```bash
# Generate JSON data (can be stopped with Ctrl+C)
python generate_data.py

# Convert to TypeScript
python json_to_ts.py
```

## Data Structure

### User
```typescript
{
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  isVerified: boolean;
  language: string; // 'en' | 'fr' | 'es' | 'de' | 'it'
}
```

### Post/Reply
```typescript
{
  id: string;
  author: User;
  content: string;
  timestamp: string;
  replies: Post[];
  likes: number;
  reposts: number;
  isBookmarked: boolean;
  isLiked: boolean;
  isReposted: boolean;
}