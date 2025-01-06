# Social Media Data Generator

Python scripts to generate mock social media data.

## Installation

```bash
pip install faker tqdm
```

## Scripts

### generate_data.py
Generates random social media data:
- 50 users with profiles
- 200 posts
- Up to 100 replies per post
- Up to 20 replies per sub-reply
- Max 4 levels of nested replies

Creates `mock_data.json`

### json_to_ts.py
Converts `mock_data.json` to TypeScript:
- Creates `mockData.ts` with proper types
- Adds a `findPost` helper function
- Maintains nested data structure

## Usage

```bash
# Generate JSON data
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