#!/bin/sh

# Define the output file
output_file="./static/nav_for_docs.json"

# Initialize the JSON object
echo "{" > $output_file

# Read lines from sidebars.js and process them
while IFS= read -r line; do
    # Check if the line contains a path that starts with 'prerequisites/' and does not contain 'README'
    if [ -n "$(echo "$line" | grep "'prerequisites/" | grep -v "README")" ]; then
        # Extract the path
        file_path=$(echo "$line" | grep -o "'prerequisites/[^']*'")
        file_path=$(echo "$file_path" | sed "s/'//g")  # Remove single quotes using sed

        # Remove the .md extension if present
        file_path_no_ext=$(echo "$file_path" | sed 's/\.md$//')

        # Get the filename (remove the path)
        file_name=$(basename "$file_path_no_ext")

        # Add to the JSON object
        echo "  \"$file_name\": \"$file_path_no_ext\"," >> $output_file
    fi
done < sidebars.js

# Remove the trailing comma from the last line and add the closing bracket
case "$(uname)" in
    Darwin*)
        # macOS
        sed -i '' -e '$s/,$//' "$output_file"
        ;;
    *)
        # Linux and other Unix systems
        sed -i '$s/,$//' "$output_file"
        ;;
esac

# Add the closing bracket for the JSON object
echo "}" >> $output_file

echo "Successfully converted file paths to JSON format and saved to $output_file"

