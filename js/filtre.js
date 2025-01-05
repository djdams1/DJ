
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
                { value: 'dj', label: 'DJing' },
                { value: 'hp', label: 'Haut-parleurs' },
                { value: 'autreson', label: 'Autres' }
            ];
        } else if (category === 'lum') {
            options = [
                { value: 'par', label: 'Pars Leds' },
                { value: 'parm', label: 'Pars Leds Moteurisé' },
                { value: 'lyre', label: 'Lyres' },
                { value: 'scan', label: 'Scanners' },
                { value: 'fume', label: 'Machines a Fumée' },
                { value: 'autrelum', label: 'Autres' }
            ];
        } else if (category === 'presta') {
            options = [
                { value: 'camps', label: 'Boom de camps' },
                { value: 'anniv', label: 'Anniversaire' }
                // ,
                // { value: 'presta-3', label: 'Prestation 3' }
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
