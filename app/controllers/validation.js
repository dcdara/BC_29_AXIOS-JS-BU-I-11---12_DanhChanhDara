function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      //error
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }

    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };

  this.kiemTraChon = function (selectId, errorId, mess) {
    if (getEle(selectId).selectedIndex !== 0) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }
    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };

  this.kiemTraDoDaiKiTu = function (value, errorId, min, max, mess) {
    if (value.trim().length >= min && value.trim().length <= max) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };

  this.kiemTraChuoiKiTu = function (value, errorId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (value.match(letter)) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };


  //Validation Tài khoản tồn tại
  this.kiemTraTaiKhoanTonTai = function (value, errorId, mess, arr) {
    var isStatus = true;

    arr.forEach(function (item) {
      if (item.taiKhoan === value) {
        //Tên tài khoản đã tồn tại
        isStatus = false;
      }
    });

    if (isStatus) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };

  //Validation Username
  this.kiemTraUsername = function (value, errorId, mess) {
    var letter = /^[a-z\-]+$/;
    if (value.match(letter)) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };

  //Validation Email
  this.kiemTraEmail = function (value, errorId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(letter)) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };

  //Validation Password
  this.kiemTraMatKhau = function (value, errorId, mess) {
    var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    if (value.match(letter)) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
}
