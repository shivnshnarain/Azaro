import re

with open('src/components/sections/Hero.tsx', 'r') as f:
    content = f.read()

replacements = [
    ('className={`${styles.heroImage} ${styles.heroFirstImage}`}', 'className={styles.heroImage}'),
    ('className={`${styles.heroImage} ${styles.heroFarLeftImage}`}', 'className={styles.heroImage}'),
    ('className={`${styles.heroImage} ${styles.heroMiddleImage}`}', 'className={styles.heroImage}'),
    ('className={`${styles.heroImage} ${styles.heroLeftImage}`}', 'className={styles.heroImage}'),
    ('className={`${styles.heroImage} ${styles.heroRightImage}`}', 'className={styles.heroImage}'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/components/sections/Hero.tsx', 'w') as f:
    f.write(content)
