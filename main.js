let title = document.querySelector('.title');
let price = document.querySelector('.price');
let taxes = document.querySelector('.taxes');
let ads = document.querySelector('.ads');
let discount = document.querySelector('.discount');
let totall = document.querySelector('.totall');
let count = document.querySelector('.count');
let category = document.querySelector('.category');
let submit = document.querySelector('.submit');

let mood = 'create'
let tmp;
//! Get Totall
function getTotall() {
    
    if(price.value != '') {
        //! + Mark To Convert Value From String To Number
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        totall.innerHTML = result;
        totall.style.background = 'green'
    } else {
        totall.innerHTML = '';
        totall.style.background = '#a00d02'
    }
}
//! Create Product

let data;
if(localStorage.product != null) {
    data = JSON.parse(localStorage.product);
} else {
    data = [];
}

submit.onclick = function() {
    let newdata = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totall: totall.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if( title.value != '' && price.value != '' && count.value < 99 && category.value != '') {
        if(mood === 'create') {
            if(newdata.count > 1) {
                for(let i = 0; i < newdata.count; i++) {
                    data.push(newdata);
                }
            } else {
                data.push(newdata);
            }
        } else {
            data[tmp] = newdata;
            mood = 'create';
            submit.innerHTML = 'Craete';
            count.style.display = 'block';
        }
        clearData()
    } else {
       
    }
    
    //! Save localstorage
    localStorage.setItem('product', JSON.stringify(data));
    showData()
}

//! Clear Inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    totall.innerHTML = '';
    count.value = '';
    category.value = '';
}
//! Read
function showData() {
    getTotall();
    let table = '';
    for(let i = 0; i < data.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].totall}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})" class="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
        </tr> `
    }

    document.querySelector('.tbody').innerHTML = table;

    let btnDeleteAll = document.querySelector('.deleteAll');
    if(data.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick = 'deleteAll()'>Delete All (${data.length}) </button>`
    } else {
        btnDeleteAll.innerHTML = '';
    }
}
showData()
//! Delete
function deleteData(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    showData();
}

function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showData();
}
//! Count
//! Update
function updateData(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    getTotall();
    count.style.display = 'none';
    category.value = data[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//! Sreach
let searchMood = 'title';

function getsearchMood(id) {
    let search = document.querySelector('.search');
    
    if(id == 'sreachtitle') {
        searchMood = 'title';  
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = ''
    for(let i = 0; i < data.length; i++) {
        if(searchMood == 'title') {
            
            
                if(data[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].totall}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                    </tr> `
                }
        } else {
        
                if(data[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].totall}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                    </tr> `
                }
        }
    }
    document.querySelector('.tbody').innerHTML = table;
}
//!Clean Data