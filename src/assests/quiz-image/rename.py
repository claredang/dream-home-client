import os
import sys
import subprocess


def rename_files(folder_path):
    # Get the folder name from the path
    folder_name = os.path.basename(folder_path)

    # Get a list of all files in the folder
    files = os.listdir(folder_path)

    # Filter files with specific extensions (you can customize the extensions as needed)
    image_extensions = ['.jpg', '.jpeg', '.png']
    image_files = [file for file in files if any(
        file.lower().endswith(ext) for ext in image_extensions)]

    # Iterate through the image files and rename them
    for index, file_name in enumerate(image_files):
        # Construct the new file name with the folder name as a prefix and index
        new_name = f"{folder_name}_{index + 1}.jpg"

        # Build the full paths for the old and new names
        old_path = os.path.join(folder_path, file_name)
        new_path = os.path.join(folder_path, new_name)

        # Rename the file
        os.rename(old_path, new_path)


if __name__ == "__main__":
    if len(sys.argv) >= 1:
        folder_name = sys.argv[1]
    else:
        print("Please provide a folder path as a command-line argument.")

    folder_path = subprocess.check_output(
        "pwd", shell=True, text=True).strip()
    folder_path += '/' + folder_name

    print(folder_path)
    rename_files(folder_path)
