def reverse_array(arr):
    left = 0
    right = len(arr) - 1

    while left < right:
        # Swap using a temporary variable
        temp = arr[left]
        arr[left] = arr[right]
        arr[right] = temp

        left += 1
        right -= 1

    return arr


# Main program
numbers = [10, 20, 30, 40, 50]

print("Original Array:", numbers)

reverse_array(numbers)

print("Reversed Array:", numbers)