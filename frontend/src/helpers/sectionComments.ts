export const getValueLike = (commendId: string) => {
  const localData = JSON.parse(localStorage.getItem('likes') ?? '[]');

  if (!localData.includes(commendId)) {
    return 1;
  } else {
    return -1;
  }
};

export const setLikes = (commentId: string) => {
  const localData: string[] = JSON.parse(localStorage.getItem('likes') ?? '[]');

  if (getValueLike(commentId) === 1) {
    const tempData = [...localData, commentId];
    localStorage.setItem('likes', JSON.stringify([...new Set(tempData)]));
  } else {
    const updatedData = localData.filter((id) => id !== commentId);
    localStorage.setItem('likes', JSON.stringify([...new Set(updatedData)]));
  }
};
