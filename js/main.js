const elParrotTemplate = document.querySelector("#parrots-tempate");
const elParrotWrapper = document.querySelector(".parrots-wrapper");

const addZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const createParrotBox = (product) => {
    const { id, title, img, price, birthDate, sizes, isFavorite, features } =
    product;

    const elParrotBox = elParrotTemplate.cloneNode(true).content;

    const elParrotId = elParrotBox.querySelector('.id');
    elParrotId.textContent = `id:${id}`;

    const elParrotImg = elParrotBox.querySelector(".card-img");
    elParrotImg.src = img;

    const elParrotTitle = elParrotBox.querySelector("#card-title");
    elParrotTitle.textContent = title;

    const elParrotPrice = elParrotBox.querySelector("#card-price");
    elParrotPrice.textContent = `${price}$`;

    const elParrotSize = elParrotBox.querySelector("#card-size");
    elParrotSize.textContent = `${sizes.width}sm x ${sizes.height}sm`;

    const elTelDate = elParrotBox.querySelector(".card-data");
    const parrotsDate = new Date(birthDate);

    elTelDate.textContent = `${addZero(parrotsDate.getDate())}.${addZero(
    parrotsDate.getMonth() + 1
  )}.${parrotsDate.getFullYear()} ${addZero(parrotsDate.getHours())}:${addZero(
    parrotsDate.getMinutes()
  )}`;

    // const elParrotFeatures = elParrotBox.querySelector(".parrots-features1");
    // elParrotFeatures.textContent = features.split(",", 1);
    // const elParrotFeatures1 = elParrotBox.querySelector(".parrots-features2");
    // elParrotFeatures1.textContent = features.split(",", 2).splice(1, 1);
    // const elParrotFeatures2 = elParrotBox.querySelector(".parrots-features3");
    // elParrotFeatures2.textContent = features.split(",", 2).splice(1, 1);


    const elParrotFeatures = elParrotBox.querySelector(".parrots-features");
    elParrotFeatures.textContent = features;


    const elIsFavorite = elParrotBox.querySelector('.btn-success')
    elIsFavorite.value = isFavorite;


    //?  Dataset bn ishlash
    const elAddBtn = elParrotBox.querySelector(".btn-trash");
    elAddBtn.dataset.id = id;

    const elSuccessBtn = elParrotBox.querySelector(".btn-success");
    elSuccessBtn.dataset.id = id;

    const elEditBtn = elParrotBox.querySelector(".btn-secondary");
    elEditBtn.dataset.id = id;


    return elParrotBox;
};



// ?   Products Array boyicha productlarni korsatib beradigan Render function
const count = document.querySelector(".count");

const renderParrots = (parrotsArray = products) => {
    elParrotWrapper.innerHTML = "";

    count.textContent = `count: ${parrotsArray.length}`;

    parrotsArray.forEach((product1) => {
        const elParrotBox = createParrotBox(product1);
        elParrotWrapper.appendChild(elParrotBox);
    });
};
renderParrots();





const elAddParrotForm = document.querySelector("#add-parrot-form");
const elAddModal = new bootstrap.Modal("#add-parrot-modal");

elAddParrotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    count.textContent = `count: ${products.length}`;

    const formElement = e.target.elements;

    const formTitle = formElement["parrot-title"].value.trim();
    const formImg = formElement["parrot-img"].value;
    const formPrice = +formElement["price"].value.trim();
    const formBrithDay = formElement["parrot-date"].value;
    const formWidth = +formElement["parrot_width"].value;
    const formHeight = +formElement["parrot_height"].value;
    const formFeatures = formElement["features"].value.trim();

    // console.log(formWidth);

    if (formTitle && formPrice && formBrithDay && formWidth && formHeight > 0) {
        const addingProduct = {
            id: Math.floor(Math.random() * 1000),
            title: formTitle,
            img: formImg,
            price: formPrice,
            sizes: {
                width: formWidth,
                height: formHeight
            },
            birthDate: formBrithDay,
            features: formFeatures
        };
        // console.log(addingProduct);

        products.unshift(addingProduct);

        const elNewParrots = createParrotBox(addingProduct);
        elParrotWrapper.prepend(elNewParrots);
        elAddParrotForm.reset();
    }
    renderParrots();
    elAddModal.hide();

});


//?  Edit ishlatish uchun olib kelingan ozgaruvchilar

const elEditModal = new bootstrap.Modal("#edit-parrot-modal");

const elEditForm = document.querySelector("#edit-parrot-form");

const elEditTitle = elEditForm.querySelector("#edit-parrot-title");
const elEditImg = elEditForm.querySelector("#edit-parrot-img");
const elEditPrice = elEditForm.querySelector("#edit-price");
const elEditDate = elEditForm.querySelector("#edit-parrot-date");
const elEditWidth = elEditForm.querySelector("#edit-parrot_width");
const elEditHeight = elEditForm.querySelector("#edit-parrot_height");
const elEditFeatures = elEditForm.querySelector("#id-features");


elParrotWrapper.addEventListener("click", (evt) => {
    if (evt.target.matches(".btn-trash")) {
        const clickedBtn = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex(
            (product) => product.id === clickedBtn
        );
        products.splice(clickedBtnIndex, 1);
        renderParrots();


    }

    if (evt.target.matches(".btn-secondary")) {
        const clickedBtn = +evt.target.dataset.id;
        const clickedBtnObj = products.find((product) => product.id === clickedBtn);

        if (clickedBtnObj) {
            const { title, img, price, birthDate, sizes, features } = clickedBtnObj;
            elEditTitle.value = title || "";
            elEditImg.value = img;
            // console.log(elEditImg);
            elEditPrice.value = price || "";
            elEditDate.value = birthDate;
            elEditWidth.value = sizes.width || "";
            elEditHeight.value = sizes.height || "";
            elEditFeatures.value = features || "";

            elEditForm.dataset.id = clickedBtn;

            // console.log(clickedBtnObj.id);
        }
    }


    // if (evt.target.matches(".btn-success")) {
    //     const icon = document.querySelector('.success-icon')
    //     if (icon.classList.remove('fa-star-o')) {
    //         icon.classList.remove('fa');
    //         icon.classList.add('fa-star')
    //     };
    //     console.log(icon);
    //     renderParrots();


    // }
});


elEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editingId = +e.target.dataset.id;

    const titleInputValue = elEditTitle.value.trim();
    const imgValue = elEditImg.value;
    // console.log(imgValue);
    const priceValue = +elEditPrice.value.trim();
    const birthDateValue = elEditDate.value;
    const widthValue = elEditWidth.value.trim();
    const heightValue = elEditHeight.value.trim();
    const featuresValue = elEditFeatures.value.trim();

    // console.log(editingId);
    if (titleInputValue && imgValue && priceValue && birthDateValue && widthValue && heightValue > 0) {
        const editingItemIndex = products.findIndex((product) => product.id === editingId);

        const editProduct = {
            id: editingId,
            title: titleInputValue,
            img: imgValue,
            price: priceValue,
            birthDate: birthDateValue,
            sizes: {
                width: widthValue,
                height: heightValue,
            },
            features: featuresValue
        };
        // console.log(editProduct.img.src);

        products.splice(editingItemIndex, 1, editProduct);

        renderParrots();
        elEditModal.hide();
    }
});




//?   Filter bn ishlash
const elFilterForm = document.querySelector("#filter-form");

elFilterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    const searchValue = elements["filter-search"].value;
    const priceFromValue = +elements["price-from"].value;
    const priceToValue = +elements["price-to"].value;
    const widthFromValue = elements["from_width"].value;
    const widthToValue = elements["to_width"].value;
    const heightFromValue = elements["from_height"].value;
    const heightToValue = elements["to_height"].value;
    const sortByValue = elements["sortby"].value;

    const filteredProduct = products
        .filter((element) => {
            return element.title
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase());
        })
        .filter((product) => {
            const ProductPrice = product.price;
            return ProductPrice >= priceFromValue;
        })
        .filter((product) => {
            const productPrice = product.price;
            return !priceToValue ? true : productPrice <= priceToValue;
        })
        .filter((product) => {
            const productWidth = product.sizes.width;
            return productWidth >= widthFromValue;
        })
        .filter((product) => {
            const productWidth = product.sizes.width;
            return !widthToValue ? true : productWidth <= widthToValue;
        })
        .filter((product) => {
            const productHeight = product.sizes.height;
            return productHeight >= heightFromValue;
        })
        .filter((product) => {
            const productHeight = product.sizes.height;
            return !heightToValue ? true : productHeight <= heightToValue;
        })

    .sort((a, b) => {
        // ? Switch case bn ishlash
        switch (sortByValue) {
            case "1":
                if (a.title > b.title) {
                    return 1;
                } else if (a.title === b.title) {
                    return 0;
                }
                return -1;
            case "2":
                return b.price - a.price;
            case "3":
                return a.price - b.price;
            case "4":
                return (
                    new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
                );
            case "5":
                return (
                    new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime()
                );

            default:
                break;
        }
        return 0;
    });

    renderParrots(filteredProduct);

});