function findKthLargest(nums, k) {
  if (!Array.isArray(nums) || nums.length === 0) {
    throw new Error("Invalid input");
  }
  if (k < 1 || k > nums.length) {
    throw new Error("Invalid k");
  }

  const target = nums.length - k;

  function partition(left, right) {
    const pivot = nums[right];
    let i = left;

    for (let j = left; j < right; j++) {
      if (nums[j] <= pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }

    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
  }

  function quickSelect(left, right) {
    if (left === right) return nums[left];

    const pivotIndex = partition(left, right);

    if (pivotIndex === target) return nums[pivotIndex];
    if (pivotIndex < target) return quickSelect(pivotIndex + 1, right);
    return quickSelect(left, pivotIndex - 1);
  }

  return quickSelect(0, nums.length - 1);
}

module.exports = findKthLargest;
