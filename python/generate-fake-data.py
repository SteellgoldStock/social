import json
import random
from faker import Faker
from uuid import uuid4
from tqdm import tqdm
import signal
import sys

# Multiple language support
fake_langs = {
    'en': Faker('en_US'),
    'fr': Faker('fr_FR'),
    'es': Faker('es'),
    'de': Faker('de_DE'),
    'it': Faker('it_IT')
}

data = {
    "users": [],
    "posts": []
}


def signal_handler(sig, frame):
    print("\nSaving current progress...")
    save_data()
    sys.exit(0)


def save_data():
    with open('mock_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def generate_hashtag():
    lang = random.choice(list(fake_langs.keys()))
    return f"#{fake_langs[lang].word()}"


def generate_user():
    lang = random.choice(list(fake_langs.keys()))
    fake = fake_langs[lang]
    return {
        "name": fake.name(),
        "handle": fake.user_name().lower(),
        "avatar": f"https://api.dicebear.com/7.x/avataaars/svg?seed={uuid4()}",
        "banner": f"https://picsum.photos/seed/{uuid4()}/800/300",
        "bio": fake.text(max_nb_chars=160),
        "isVerified": random.random() > 0.8,
        "language": lang
    }


def generate_reply(users, depth):
    user = random.choice(users)
    fake = fake_langs[user['language']]

    reply = {
        "id": str(uuid4()),
        "author": user,
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
    user = random.choice(users)
    fake = fake_langs[user['language']]

    post = {
        "id": str(uuid4()),
        "author": user,
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
    signal.signal(signal.SIGINT, signal_handler)

    print("Generating users...")
    data["users"] = [generate_user() for _ in range(50)]

    print("Generating posts... (Press Ctrl+C to save and exit)")
    try:
        for _ in tqdm(range(200)):
            data["posts"].append(generate_post(data["users"]))
            if (_ + 1) % 10 == 0:  # Auto-save every 10 posts
                save_data()
    except KeyboardInterrupt:
        print("\nInterrupted by user. Saving progress...")
    finally:
        save_data()
        print(f"Saved {len(data['posts'])} posts")


if __name__ == "__main__":
    main()