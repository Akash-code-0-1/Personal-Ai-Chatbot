#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

source_dir = Path('/vercel/share/v0-project/nlp like')
dest_dir = Path('/vercel/share/v0-project')

# List of directories and files to copy
items_to_copy = [
    'app/api',
    'components',
    'lib',
    'prisma',
    'public',
    'hooks',
    'styles',
]

for item in items_to_copy:
    src = source_dir / item
    dst = dest_dir / item
    
    if src.exists():
        if src.is_dir():
            # Remove destination if it exists
            if dst.exists():
                shutil.rmtree(dst)
            # Copy entire directory
            shutil.copytree(src, dst)
            print(f"Copied directory: {item}")
        else:
            # Copy file
            if dst.parent.exists():
                shutil.copy2(src, dst)
                print(f"Copied file: {item}")
    else:
        print(f"Source not found: {item}")

print("Copy complete!")
