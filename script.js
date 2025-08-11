document.getElementById('translate-btn').addEventListener('click', () => {
    const el = document.getElementById('google_translate_element');
    el.style.display = (el.style.display === 'none' || el.style.display === '') 
        ? 'block' 
        : 'none';
});
