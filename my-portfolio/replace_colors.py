import re

# Read the file
with open(r'C:\Users\Kanis\Downloads\Portfolio\my-portfolio\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements (order matters - more specific first)
replacements = [
    # Hover border colors
    (r'hover:border-blue-600 dark', 'hover:border-orange-600 dark'),
    (r'group-hover:text-blue-600 dark', 'group-hover:text-orange-600 dark'),
    (r'group-hover:bg-blue-600 dark', 'group-hover:bg-orange-600 dark'),
    (r'group-hover:border-blue-600 dark', 'group-hover:border-orange-600 dark'),
    
    # Border colors
    (r'border-blue-600 dark', 'border-orange-600 dark'),
    (r'border-b-2 border-blue-600 dark', 'border-b-2 border-orange-600 dark'),
    
    # Background colors in cards
    (r'bg-blue-600 dark:bg-yellow-400', 'bg-orange-600 dark:bg-yellow-400'),
    (r'bg-blue-600 dark:bg-gray-800', 'bg-orange-600 dark:bg-gray-800'),
    
    # Hex color for whileHover
    (r"'#2563eb'", "'#ea580c'"),
    
    # Focus ring colors  
    (r'focus-visible:ring-blue-600', 'focus-visible:ring-orange-600'),
]

# Apply replacements
for old, new in replacements:
    content = content.replace(old, new)

# Write back
with open(r'C:\Users\Kanis\Downloads\Portfolio\my-portfolio\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacements completed successfully!")
