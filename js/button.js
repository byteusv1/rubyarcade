
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('mousemove', e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    const offsetX = deltaX * 10; // Adjust the scale factor as needed
    const offsetY = deltaY * 10; // Adjust the scale factor as needed
    const scale = 1.2;
    const img = button.querySelector('img');
    img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  });

  button.addEventListener('mouseleave', () => {
    const img = button.querySelector('img');
    img.style.transform = 'translate(0, 0) scale(1)';
  });
});

const btn = document.querySelector('.btn');


btn.addEventListener('mouseleave', () => {
  btn.style.backgroundImage = '';
});