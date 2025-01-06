import json
import random
from faker import Faker
from uuid import uuid4
from tqdm import tqdm

fake = Faker('fr_FR')


def generate_hashtag():
    return f"#{fake.word()}"


def generate_user():
    return {
        "name": fake.name(),
        "handle": fake.user_name().lower(),
        "avatar": f"https://api.dicebear.com/7.x/avataaars/svg?seed={uuid4()}",
        "banner": f"https://picsum.photos/seed/{uuid4()}/800/300",
        "bio": fake.text(max_nb_chars=160),
        "isVerified": random.random() > 0.8
    }


def generate_reply(users, depth):
    reply = {
        "id": str(uuid4()),
        "author": random.choice(users),
        "content": random.choice([
            fake.text(max_nb_chars=280),
            f"{fake.sentence()} {generate_hashtag()} {generate_hashtag()}",
            f"{fake.text(max_nb_chars=50)} 😊 {generate_hashtag()}",
            f"@{fake.user_name()} {fake.sentence()}"
        ]),
        "timestamp": f"{random.randint(1, 59)}{random.choice(['s', 'm', 'h', 'd'])}",
        "likes": random.randint(0, 500),
        "reposts": random.randint(0, 100),
        "isBookmarked": random.random() > 0.7,
        "isLiked": random.random() > 0.5,
        "isReposted": random.random() > 0.8,
        "replies": []
    }

    if depth < 4 and random.random() > 0.3:
        num_replies = random.randint(0, 20)
        for _ in range(num_replies):
            reply["replies"].append(generate_reply(users, depth + 1))

    return reply


def generate_post(users):
    post = {
        "id": str(uuid4()),
        "author": random.choice(users),
        "content": random.choice([
            fake.paragraph(),
            f"{fake.sentence()} {generate_hashtag()} {generate_hashtag()}",
            f"Check this out! {fake.url()}",
            f"Big news! {fake.text(max_nb_chars=200)} 🚀",
            f"Thread 🧵\n{fake.text(max_nb_chars=250)}"
        ]),
        "timestamp": f"{random.randint(1, 59)}{random.choice(['s', 'm', 'h', 'd'])}",
        "likes": random.randint(0, 10000),
        "reposts": random.randint(0, 5000),
        "isBookmarked": random.random() > 0.7,
        "isLiked": random.random() > 0.5,
        "isReposted": random.random() > 0.8,
        "replies": []
    }

    if random.random() > 0.2:
        num_replies = random.randint(0, 100)
        for _ in range(num_replies):
            post["replies"].append(generate_reply(users, 1))

    return post


def main():
    print("Generating users...")
    users = [generate_user() for _ in range(50)]

    print("Generating posts...")
    posts = []
    for _ in tqdm(range(200)):
        posts.append(generate_post(users))

    data = {"users": users, "posts": posts}

    print("Saving to file...")
    with open('mock_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
    print("Done!")