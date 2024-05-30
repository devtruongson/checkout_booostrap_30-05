const productListRender = document.querySelector("#product-list-render");
if (productListRender) {
    fetch("https://6657ea575c36170526463e1c.mockapi.io/api/v1/products")
        .then((res) => res.json())
        .then((res) => {
            const data = res
                .map((item) => {
                    return `
            <div class="col-3">
                <a class="card-itemp-product shadow-sm " href="/detailProduct.html?q=${item.id
                        }">
                    <img src="${item.thumbnail}" alt="" />
                    <div class="mt-2">
                        <h2>
                            ${item.title}
                        </h2>
                        <div class="price-card">
                            <span>
                                ${item.discount
                            ? `<label style="text-decoration: line-through;" class="me-2">${validateVND(
                                item.price
                            )}</label>`
                            : ""
                        }
                                ${validateVND(
                            item.discount
                                ? item.price -
                                item.price * (item.discount / 100)
                                : item.price
                        )}
                            </span>
                            <span> Đã bán 80 </span>
                        </div>
                    </div>
                </a>
            </div>
        `;
                })
                .join("");
            productListRender.innerHTML = data;
        });
}

function validateVND(vnd) {
    return vnd.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}

const renderDetails = document.querySelector("#render-product-detail");

if (renderDetails) {
    const idRender = +window.location.search.split("?q=")[1];
    if (idRender) {
        fetch(`https://6657ea575c36170526463e1c.mockapi.io/api/v1/products/${idRender}`)
            .then(res => res.json())
            .then(item => {
                const htmlBuilder = `
                    <div class="col-md-5">
                        <img id="img-render-thumbnail-main" src="${item.thumbnail}"
                            class="img-fluid rounded-sm" style="border-radius: 10px;" alt="Product Image" />
                        <div class="list-image-render">
                            <img class="active"
                                src="${item.thumbnail}" alt="">
                            <img src="${item.thumbnail_one}"
                                alt="">
                            <img src="${item.thumbnail_two}"
                                alt="">
                            <img src="${item.thumbnail_three}"
                                alt="">
                        </div>
                    </div>
                    <div class="col-md-7">
                        <h2>${item.title}</h2>
                        <div class="d-flex align-items-center mb-2" id="badge">
                            <span class="">5.0</span>
                            <span class="ms-2">4 Đánh Giá</span>
                            <span class="ms-2">80 Đã Bán</span>
                        </div>
                        <h3 class="price_detail">
                            <div>
                                ${item.discount ? `  
                                <p style="text-decoration: line-through;">${validateVND(+item.price)}</p>` : ""}
                                <p>
                                ${validateVND(
                    item.discount
                        ? item.price -
                        item.price * (item.discount / 100)
                        : item.price)}
                                    <span class="ms-3 badge rounded-pill bg-warning text-dark">${item.discount}% giảm</span>
                                </p >
                            </div >
                        </h3 >
                        <div class="mb-3" id="chinh-sach">
                            <p><span>Chính Sách Trả Hàng</span> Trả hàng 15 ngày, Đổi ý miễn phí</p>
                            <p><span>Vận Chuyển</span> Miễn phí vận chuyển</p>
                        </div>

                        <!--Product Options-- >
                        <div class="mb-3" id="size">
                            <div>
                                Size
                            </div>
                            <div>
                                <button class="btn">S</button>
                                <button class="btn">M</button>
                                <button class="btn">L</button>
                            </div>
                        </div>
                        <!--Quantity -->
                        <div id="soluong" class=" mb-4">
                            <div>
                                Số lượng
                            </div>
                            <div class="quantity-input">
                                <button class="quantity-btn" id="minus-btn">-</button>
                                <input type="number" id="quantity" value="1" min="1">
                                <button class="quantity-btn" id="plus-btn">+</button>
                            </div>
                            <span>
                                ${item.count} sản phẩm có sẵn
                            </span>
                        </div>
                        <!--Buttons -->
                    <div class="d-flex">
                        <button class="btn btn-add-card me-2">
                            Thêm Vào Giỏ Hàng
                        </button>
                        <button class="btn btn-buy">Mua Ngay</button>
                    </div>
                    </div >
                    <div class="col-12 mt-4" style="white-space: pre-wrap;">${item.description}</div>
                `;
                renderDetails.innerHTML = htmlBuilder;
                const listRenderImage = document.querySelectorAll(".list-image-render img");
                const thumbnailMain = document.querySelector("#img-render-thumbnail-main")
                if (listRenderImage.length > 0) {
                    listRenderImage.forEach(ele => {
                        ele.addEventListener("click", (e) => {
                            const url = ele.getAttribute("src");
                            if (thumbnailMain) {
                                listRenderImage.forEach(item => {
                                    item.classList.remove("active");
                                })
                                thumbnailMain.setAttribute("src", url);
                                ele.classList.add("active")
                            }
                        })
                    })
                }
                if (window.location.pathname.includes("detailProduct.html")) {
                    document.getElementById("minus-btn").addEventListener("click", function () {
                        var quantityInput = document.getElementById("quantity");
                        var currentValue = parseInt(quantityInput.value);
                        if (currentValue > 1) {
                            quantityInput.value = currentValue - 1;
                        }
                    });

                    document.getElementById("plus-btn").addEventListener("click", function () {
                        var quantityInput = document.getElementById("quantity");
                        var currentValue = parseInt(quantityInput.value);
                        quantityInput.value = currentValue + 1;
                    });
                }
            })
    }
}

const formAdmin = document.querySelector("#admin form");
if (formAdmin) {
    formAdmin.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (formAdmin.dataset.action === "add") {
            const elements = formAdmin.querySelectorAll("[name]");

            const dataBuilder = {};
            elements.forEach(ele => {
                if (!ele.value) {
                    alert("Vui lòng nhập đầy đủ các trường!");
                    return;
                }

                dataBuilder[ele.name] = ele.value;
            })

            try {
                const rawResponse = await fetch('https://6657ea575c36170526463e1c.mockapi.io/api/v1/products', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataBuilder)
                });
                const content = await rawResponse.json();
                console.log(content);
                const check = confirm("Bạn đã tạo thành công sản phẩm!");
                if (check) {
                    window.location.reload();
                } else {
                    window.location.reload();
                }

            } catch (error) {
                console.log("Error: " + error);
            }
        }

        if (formAdmin.dataset.action === "update") {
            const elements = formAdmin.querySelectorAll("[name]");

            const dataBuilder = {};
            elements.forEach(ele => {
                if (!ele.value) {
                    alert("Vui lòng nhập đầy đủ các trường!");
                    return;
                }

                dataBuilder[ele.name] = ele.value;
            })

            try {
                const rawResponse = await fetch(`https://6657ea575c36170526463e1c.mockapi.io/api/v1/products/${formAdmin.dataset.id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataBuilder)
                });
                const content = await rawResponse.json();
                console.log(content);
                const check = confirm("Bạn đã cập nhật thành công sản phẩm!");
                if (check) {
                    window.location.reload();
                } else {
                    window.location.reload();
                }

            } catch (error) {
                console.log("Error: " + error);
            }
        }

    });
}

const renderTableAdmin = document.querySelector(".render-table-admin");
const buttonAdmin = document.querySelector("#button-admin-handler")

if (renderTableAdmin) {
    fetch("https://6657ea575c36170526463e1c.mockapi.io/api/v1/products")
        .then(res => res.json())
        .then(data => {
            const htmlRender = data.map((item, index) => {
                return `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>
                            <img style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;" src="${item.thumbnail}" />
                        </td>
                        <td>${item.title}</td>
                        <td>${item.count}</td>
                        <td>${validateVND(item.price)}</td>
                        <td>
                            <button class="btn btn-primary" id="edit-admin" data-id="${item.id}">Sửa</button>
                            <button class="btn btn-danger mx-2" id="delete-admin" data-id="${item.id}">Xóa</button>
                        </td>
                    </tr>
                `
            }).join("")
            renderTableAdmin.innerHTML = htmlRender;
            const buttonEdit = document.querySelectorAll("#edit-admin");
            if (buttonEdit.length > 0) {
                buttonEdit.forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        const idClick = +e.target.dataset.id;

                        if (idClick) {
                            fetch(`https://6657ea575c36170526463e1c.mockapi.io/api/v1/products/${idClick}`)
                                .then(res => res.json())
                                .then(data => {
                                    if (formAdmin) {
                                        const elements = formAdmin.querySelectorAll("[name]");
                                        elements.forEach(ele => {
                                            for (item in data) {
                                                if (ele.name === item) {
                                                    ele.value = data[item];
                                                }
                                            }
                                        })
                                        buttonAdmin.innerText = "Cập Nhật";
                                        formAdmin.dataset.action = "update";
                                        formAdmin.dataset.id = idClick;
                                    }
                                })
                        }
                    })
                })
            }
            const buttonDelete = document.querySelectorAll("#delete-admin");
            if (buttonDelete.length > 0) {
                buttonDelete.forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        const idClick = +e.target.dataset.id;
                        if (idClick) {
                            fetch(`https://6657ea575c36170526463e1c.mockapi.io/api/v1/products/${idClick}`, {
                                method: 'DELETE',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                            })
                                .then(res => {
                                    const check = confirm("Bạn đã xóa thành công sản phẩm!");
                                    if (check) {
                                        window.location.reload();
                                    } else {
                                        window.location.reload();
                                    }
                                })

                        }
                    })
                })
            }
        })
}   