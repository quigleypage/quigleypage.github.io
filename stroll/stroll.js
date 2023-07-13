document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < 49; i++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      document.querySelector('.grid').appendChild(gridItem);
    }
  });