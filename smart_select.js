document.addEventListener('DOMContentLoaded', () => {
  const CarShop = (function() {
    const cars = [
      { make: 'Honda', image: 'car_filtering_images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
      { make: 'Honda', image: 'car_filtering_images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
      { make: 'Toyota', image: 'car_filtering_images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
      { make: 'Toyota', image: 'car_filtering_images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
      { make: 'Suzuki', image: 'car_filtering_images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
      { make: 'Audi', image: 'car_filtering_images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
      { make: 'Audi', image: 'car_filtering_images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
    ];

    return {
      init() {
        this.allCars = cars;
        this.categories = ['make', 'model', 'price', 'year'];
        this.filterArea = document.getElementById('filters');
        this.carArea = document.getElementById('cars');
        this.allTemplates = Array.prototype.slice.call(document.querySelectorAll('[type="text/x-handlebars-template"]'));
        this.compiledTemplates = {};
        this.compileTemplates();
        this.registerAllPartials();
        this.renderFilterArea(this.allCars);
        this.renderCars(this.allCars);
        this.bindEvents();
      },

      bindEvents() {
        let filterButton = document.querySelector('.filter_btn');
        filterButton.addEventListener('click', this.handleFilter.bind(this));
        this.filterArea.addEventListener('input', this.handleFilterChange.bind(this));
      },

      registerAllPartials() {
        let allPartialTemplates = Array.prototype.slice.call(document.querySelectorAll('[data-type="partial"]'));
        allPartialTemplates.forEach(partialTemplate => {
          Handlebars.registerPartial(partialTemplate.id, partialTemplate.innerHTML);
        });
      },

      handleFilterChange(event) {
        if (event.target.tagName === 'SELECT') {
          let selectedValues = this.getSelectedValues();
          let selectedCategories = Object.keys(selectedValues);
          let otherCategories = this.categories.filter(category => !selectedCategories.includes(category));
          this.renderOtherCategoryFilters(otherCategories, selectedValues);
        }
      },

      renderOtherCategoryFilters(otherCategories, selectedValues) {
        let carMatches = this.findCarMatches(selectedValues);
        let filtersObj = {};

        otherCategories.forEach(category => {
          filtersObj[category + 's'] = this.selectUniqueValues(category, carMatches);
        });

        otherCategories.forEach(category => {
          let newFilterHtml = this.compiledTemplates[category + '_options_template'](filtersObj);
          let replaceArea = this.filterArea.querySelector(`#${category}_select`);
          replaceArea.textContent = '';
          replaceArea.insertAdjacentHTML('beforeend', newFilterHtml);
        });
      },

      handleFilter(event) {
        event.preventDefault();

        let filteredVals = this.gatherFilteredVals();
        let carMatches = this.findCarMatches(filteredVals);
        this.renderCars(carMatches);
      },

      getSelectedValues() {
        let allSelectAreas = Array.prototype.slice.call(this.filterArea.querySelectorAll('select'));
        let selectedValues = {};
        allSelectAreas.forEach(select => {
          if (select.value) {
            if (select.getAttribute('name') === 'price' || select.getAttribute('name') === 'year') {
              selectedValues[select.getAttribute('name')] = Number(select.value);
            } else {
              selectedValues[select.getAttribute('name')] = select.value;
            }
          }
        });
        return selectedValues;
      },

      gatherFilteredVals() {
        let make = document.getElementById('make_select').value;
        let model = document.getElementById('model_select').value;
        let price = document.getElementById('price_select').value;
        let year = document.getElementById('year_select').value;

        let filteredVals = {};
        if (make) filteredVals['make'] = make;
        if (model) filteredVals['model'] = model;
        if (price) filteredVals['price'] = Number(price);
        if (year) filteredVals['year'] = Number(year);

        return filteredVals;
      },

      findCarMatches(filteredVals) {
        return this.allCars.filter(car => {
          let allMatch = true;

          for (let key in filteredVals) {
            if (!(filteredVals[key] === car[key])) {
              allMatch = false;
            }
          }

          return allMatch;
        });
      },

      renderCars(carsArr) {
        this.carArea.textContent = '';
        let carsHtml = this.compiledTemplates['cars_template']({cars: carsArr});
        this.carArea.insertAdjacentHTML('beforeend', carsHtml);
      },

      renderFilterArea(carArr) {
        this.filterArea.textContent = '';
        let makes = this.selectUniqueValues('make', carArr);
        let models = this.selectUniqueValues('model', carArr);
        let prices = this.selectUniqueValues('price', carArr);
        let years = this.selectUniqueValues('year', carArr);
        let filtersObj = { makes: makes, models: models, prices: prices, years: years };

        let filtersHtml = this.compiledTemplates['filters_template'](filtersObj);
        this.filterArea.insertAdjacentHTML('beforeend', filtersHtml);
      },

      selectUniqueValues(category, carArr) {
        let vals = carArr.map(car => car[category]);
        let uniqueVals = [];

        vals.forEach(val => {
          if (!uniqueVals.includes(val)) {
            uniqueVals.push(val);
          }
        });

        if (typeof uniqueVals[0] === 'number') {
          uniqueVals.sort((a, b) => a - b);
        } else {
          uniqueVals.sort();
        }

        return uniqueVals;
      },

      compileTemplates() {
        this.allTemplates.forEach(template => {
          this.compiledTemplates[template.id] = Handlebars.compile(template.innerHTML);
        });
      },
    };
  })();

  CarShop.init();
});



// add event for class `filter_btn` - click
  // when click, prevent default
  // figure out values of each of the `select` areas within `filters` area
  // find the car(s) that match all values
  // render `cars_template` again

// render all cars `cars_template` pass in `cars` object - append to `cars` area