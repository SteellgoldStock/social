import json
import random
from faker import Faker
from uuid import uuid4
from tqdm import tqdm
import signal
import sys
from concurrent.futures import ThreadPoolExecutor
import threading

# Thread-local storage for Faker instances
thread_local = threading.local()


def get_faker(lang):
    if not hasattr(thread_local, "fakers"):
        thread_local.fakers = {
            'en': Faker('en_US'),
            'fr': Faker('fr_FR'),
            'es': Faker('es'),
            'de': Faker('de_DE'),
            'it': Faker('it_IT')
        }
    return thread_local.fakers[lang]


data = {"users": [], "posts": []}


def signal_handler(sig, frame):
    print("\nSaving progress...")
    save_data()
    sys.exit(0)


def save_data():
    with open('mock_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def generate_user():
    lang = random.choice(['en', 'fr', 'es', 'de', 'it'])
    fake = get_faker(lang)
    return {
        "name": fake.name(),
        "handle": fake.user_name().lower(),
        "avatar": f"https://api.dicebear.com/7.x/avataaars/svg?seed={uuid4()}&backgroundColor={random.choice(['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'])}",
        "banner": f"https://picsum.photos/seed/{uuid4()}/800/300",
        "bio": fake.text(max_nb_chars=160),
        "isVerified": random.random() > 0.8,
        "language": lang
    }


def generate_reply(users, depth=0):
    if depth >= 4:
        return []

    user = random.choice(users)
    fake = get_faker(user['language'])
    reply = {
        "id": str(uuid4()),
        "author": user,
        "content": random.choice([
            fake.text(max_nb_chars=280),
            f"{fake.sentence()} #{fake.word()} #{fake.word()}",
            f"{fake.text(max_nb_chars=50)} 😊 #{fake.word()}",
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

    if random.random() > 0.3:
        num_replies = random.randint(0, 20)
        reply["replies"] = [generate_reply(users, depth + 1) for _ in range(num_replies)]

    return reply


def generate_post_with_replies(args):
    user, users = args
    fake = get_faker(user['language'])

    post = {
        "id": str(uuid4()),
        "author": user,
        "content": random.choice([
            fake.paragraph(),
            f"{fake.sentence()} #{fake.word()} #{fake.word()}",
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
        num_replies = random.randint(0, 9)
        post["replies"] = [generate_reply(users) for _ in range(num_replies)]

    return post


def main():
    signal.signal(signal.SIGINT, signal_handler)

    print("Generating users...")
    data["users"] = [generate_user() for _ in range(5)]

    print("Generating posts... (Ctrl+C to save and exit)")
    try:
        with ThreadPoolExecutor(max_workers=8) as executor:
            for user in data["users"]:
                num_posts = random.randint(2, 20)
                future_posts = [executor.submit(generate_post_with_replies, (user, data["users"]))
                                for _ in range(num_posts)]

                for future in tqdm(future_posts, desc=f"Posts for {user['handle']}"):
                    data["posts"].append(future.result())

                    if len(data["posts"]) % 10 == 0:
                        save_data()

    except KeyboardInterrupt:
        print("\nSaving progress...")
    finally:
        save_data()
        print(f"Generated {len(data['posts'])} posts")


if __name__ == "__main__":
    main()