import json


def json_to_ts():
    with open('mock_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    ts_content = """import { PostProps, UserProps } from "./types";

export const users: UserProps[] = """ + json.dumps(data['users'], ensure_ascii=False, indent=2) + """;

export const posts: PostProps[] = """ + json.dumps(data['posts'], ensure_ascii=False, indent=2) + """;

export const findPost = (id: string, posts: PostProps[]): PostProps | undefined => {
  for (const post of posts) {
    if (post.id === id) return post;
    const foundInReplies = findPost(id, post.replies);
    if (foundInReplies) return foundInReplies;
  }
  return undefined;
};"""

    with open('mockData.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)


if __name__ == "__main__":
    json_to_ts()
    print("Fichier mockData.ts généré avec succès")