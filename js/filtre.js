document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('filter-category');
    const subcategorySelect = document.getElementById('filter-subcategory');
    const subcategoryLabel = document.querySelector('label[for="filter-subcategory"]');

    const updateSubcategoryOptions = (category) => {
        subcategorySelect.innerHTML = '';
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'Tous';
        subcategorySelect.appendChild(allOption);
        subcategorySelect.disabled = false;

        let options = [];
        if (category === 'son') {
            options = [
                { value: 'son-1', label: 'Son 1' },
                { value: 'son-2', label: 'Son 2' },
                { value: 'son-3', label: 'Son 3' }
            ];
        } else if (category === 'lum') {
            options = [
                { value: 'lum-1', label: 'Lumière 1' },
                { value: 'lum-2', label: 'Lumière 2' },
                { value: 'lum-3', label: 'Lumière 3' }
            ];
        }

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            subcategorySelect.appendChild(optionElement);
        });

        if (options.length === 0) {
            subcategorySelect.disabled = true;
        }
    };

    const toggleFilterVisibility = (isVisible) => {
        if (isVisible) {
            subcategorySelect.classList.remove('select-hidden');
            subcategoryLabel.classList.remove('label-hidden');
        } else {
            subcategorySelect.classList.add('select-hidden');
            subcategoryLabel.classList.add('label-hidden');
        }
    };

    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;

        if (selectedCategory === 'all') {
            toggleFilterVisibility(false); 
        } else {
            toggleFilterVisibility(true);
            updateSubcategoryOptions(selectedCategory);
        }

        filterImages(); 
    });

    subcategorySelect.addEventListener('change', function() {
        filterImages(); 
    });

    const filterImages = () => {
        const selectedCategory = categorySelect.value;
        const selectedSubcategory = subcategorySelect.value;

        document.querySelectorAll('.photo-item').forEach(item => {
            if (selectedCategory === 'all') {
                item.classList.add('show');
            } else {
                if (item.classList.contains(selectedCategory)) {
                    if (selectedSubcategory === 'all' || item.classList.contains(selectedSubcategory)) {
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                    }
                } else {
                    item.classList.remove('show');
                }
            }
        });
    };

    updateSubcategoryOptions(categorySelect.value);

    if (categorySelect.value === 'all') {
        toggleFilterVisibility(false);
    } else {
        toggleFilterVisibility(true);
    }

    document.querySelectorAll('.photo-item').forEach(item => {
        item.classList.add('show');
    });
});
