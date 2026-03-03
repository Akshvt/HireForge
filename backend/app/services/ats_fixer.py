def apply_fixes(original_text: str, feedback: list):
    """
    Replace weak lines with improved examples
    """
    updated_text = original_text

    for item in feedback:
        old = item.get("line", "")
        new = item.get("improved_example", "")

        if old and new and old in updated_text:
            updated_text = updated_text.replace(old, new)

    return updated_text
