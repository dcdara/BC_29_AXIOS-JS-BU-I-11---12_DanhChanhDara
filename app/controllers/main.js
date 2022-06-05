var service = new Servcies();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

function getListTeacher() {
  service
    .getListTeacherApi()
    .then(function (result) {
      renderListTeacher(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListTeacher();

function renderListTeacher(data) {


  var contentHTML = "";

  data.forEach(function (teacher, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${teacher.taiKhoan}</td>
            <td>${teacher.matKhau}</td>
            <td>${teacher.hoTen}</td>
            <td>${teacher.email}</td>
            <td>${teacher.ngonNgu}</td>
            <td>${teacher.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editTeacher(${teacher.id})">Sửa</button>
                <button class="btn btn-danger" onclick="deleteTeacher(${teacher.id})">Xoá</button>
            </td>
        </tr>
    `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;

}

/**
 * Xoa SP
 */
function deleteTeacher(id) {
  service
    .deleteTeacherApi(id)
    .then(function () {
      //render table
      getListTeacher();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemNguoiDung").onclick = function () {
  //Sửa lại title modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";

  //Thêm nút "Add" vào footer modal
  var footer = `<button class="btn btn-success" onclick="addTeacher()">Thêm</button>
                <button class="btn btn-success" value="reset data" onclick="reset()">Reset</button> 
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Add Teacher
 */

function addTeacher(isAdd) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;

  //Check username
  if (isAdd) {
    //Kiểm tra tên tài khoản
    isValid &= validation.kiemTraRong(taiKhoan, "tbTK", "(*) Vui lòng nhập tài khoản")
      && validation.kiemTraDoDaiKiTu(taiKhoan, "tbTK", 4, 12, "(*) Tên tài khoản phải có độ dài từ 4-12 ký tự không dấu, bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa ")
      && validation.kiemTraUsername(taiKhoan, "tbTK", "(*) Tên tài khoản bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa")
      && validation.kiemTraTaiKhoanTonTai(taiKhoan, "tbTK", "(*) Tài khoản đã tồn tại", teacher.taiKhoan);
  }

  isValid &= validation.kiemTraRong(taiKhoan, "tbTK", "(*) Vui lòng nhập tài khoản")
    && validation.kiemTraDoDaiKiTu(taiKhoan, "tbTK", 4, 6, "(*) Tên tài khoản phải có độ dài từ 4-6 ký tự không dấu, bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa ")
    && validation.kiemTraUsername(taiKhoan, "tbTK", "(*) Tên tài khoản bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa");

  //Check name
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập họ và tên") &&
    validation.kiemTraChuoiKiTu(hoTen, "tbTen", "(*) Họ và tên nhân viên phải là chữ và không chứa ký tự đặt biệt");

  //Check password
  isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui lòng nhập mật khẩu")
    && validation.kiemTraDoDaiKiTu(matKhau, "tbMatKhau", 6, 10, "(*) Mật khẩu phải có độ dài từ 6-10 ký tự, chứa it nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")
    && validation.kiemTraMatKhau(matKhau, "tbMatKhau", "(*) Mật khẩu phải có độ dài từ 6-10 ký tự, chứa it nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

  //Check email
  isValid &= validation.kiemTraRong(email, "tbEmail", "(*)Vui lòng nhập email")
    && validation.kiemTraEmail(email, "tbEmail", "(*)Email không hợp lệ");

  //Check hình ảnh
  isValid &= validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng nhập hình ảnh");

  //Check loại người dùng
  isValid &= validation.kiemTraChon("loaiNguoiDung", "tbNguoiDung", "(*) Vui lòng chọn người dùng");

  //Check loại ngôn ngữ
  isValid &= validation.kiemTraChon("loaiNgonNgu", "tbNgonNgu", "(*) Vui lòng chọn ngôn ngữ");

  //Check mô tả
  isValid &= validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng nhập mô tả");

  if (!isValid) return;

  //doi tuong teacher
  var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);

  service
    .addTeacherApi(teacher)
    .then(function () {
      //render table
      getListTeacher();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Edit Teacher
 */
function editTeacher(id) {
  //Sửa lại title modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Cập nhật người dùng";

  //Thêm nút "Update" vào footer modal
  var footer = `<button class="btn btn-success" onclick="updateTeacher(${id})">Cập nhật</button>
                <button class="btn btn-success" value="reset data" onclick="reset()">Reset</button>    
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  //getTeacherById
  service
    .getTeacherById(id)
    .then(function (result) {
      //show thông tin ra các thẻ input
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
      getEle("TaiKhoan").disabled = true;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update Teacher
 */
function updateTeacher(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var isValid = true;

  //Check username
  //Kiểm tra tên tài khoản
  isValid &= validation.kiemTraRong(taiKhoan, "tbTK", "(*) Vui lòng nhập tài khoản")
    && validation.kiemTraDoDaiKiTu(taiKhoan, "tbTK", 4, 12, "(*) Tên tài khoản phải có độ dài từ 4-12 ký tự không dấu, bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa ")
    && validation.kiemTraUsername(taiKhoan, "tbTK", "(*) Tên tài khoản bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa");

  isValid &= validation.kiemTraRong(taiKhoan, "tbTK", "(*) Vui lòng nhập tài khoản")
    && validation.kiemTraDoDaiKiTu(taiKhoan, "tbTK", 4, 6, "(*) Tên tài khoản phải có độ dài từ 4-6 ký tự không dấu, bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa ")
    && validation.kiemTraUsername(taiKhoan, "tbTK", "(*) Tên tài khoản bao gồm các chữ cái thường a-z và số 0-9, không có chữ in hoa");
  //Check name
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập họ và tên") &&
    validation.kiemTraChuoiKiTu(hoTen, "tbTen", "(*) Họ và tên nhân viên phải là chữ và không chứa ký tự đặt biệt");
  //Check password
  isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui lòng nhập mật khẩu")
    && validation.kiemTraDoDaiKiTu(matKhau, "tbMatKhau", 6, 10, "(*) Mật khẩu phải có độ dài từ 6-10 ký tự, chứa it nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")
    && validation.kiemTraMatKhau(matKhau, "tbMatKhau", "(*) Mật khẩu phải có độ dài từ 6-10 ký tự, chứa it nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

  //Check email
  isValid &= validation.kiemTraRong(email, "tbEmail", "(*)Vui lòng nhập email")
    && validation.kiemTraEmail(email, "tbEmail", "(*)Email không hợp lệ");

  //Check hình ảnh
  isValid &= validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng nhập hình ảnh");

  //Check loại người dùng
  isValid &= validation.kiemTraChon("loaiNguoiDung", "tbNguoiDung", "(*) Vui lòng chọn người dùng");

  //Check loại ngôn ngữ
  isValid &= validation.kiemTraChon("loaiNgonNgu", "tbNgonNgu", "(*) Vui lòng chọn ngôn ngữ");

  //Check mô tả
  isValid &= validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng nhập mô tả");

  if (!isValid) return;
  var teacher = new Teacher(id, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);

  service
    .updateTeacherApi(teacher)
    .then(function () {
      //render table
      getListTeacher();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Reset form
function reset() {
  getEle("huy").reset();
  getEle("TaiKhoan").disabled = false;

}
