var service = new Services();
function getEle(id) {
    return document.getElementById(id);
}

function getListTeacher() {
    //Lấy danh sách sản phẩm từ Server

    var promise = service.getListTeacherAPI();
    promise
        .then(function (result) {
            renderListTeacher(result.data)
        })
        .catch(function (error) {
            console.log(error);
        })

}

getListTeacher();


function renderListTeacher(data) {
    var contentHTML = "";
    data.forEach(function (teacher) {
        if (teacher.loaiND == "GV"){
        contentHTML += `
        <div class="card__item col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 animate__animated animate__fadeIn animate__delay-2s animate__faste 100ms">
                    <div class="card card__image">
                        <div class="card__image--hover">
                            <img id="txtImage" class="card-img-top" src="./images/${teacher.hinhAnh}" alt="Card image">
                        </div>
                        <div class="card-body">
                            <h6 id="txtLanguage" class="text-center card__language">${teacher.ngonNgu}</h6>
                            <h4 id="txtName" class="card-title text-center">${teacher.hoTen}</h4>
                            <p id="txtInfo" class="card-text text-center">${teacher.moTa}
                            </p>
                        </div>
                    </div>
            </div>
        `
        }
    })
    getEle("listOurTeach").innerHTML = contentHTML;
}
