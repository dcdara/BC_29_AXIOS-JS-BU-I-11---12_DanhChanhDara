function Servcies() {
    this.getListTeacherApi = function () {
      return axios({
        url: "https://6299ab256f8c03a97846c3c5.mockapi.io/teachers",
        method: "GET",
      });
    };
  
    this.deleteTeacherApi = function (id) {
      return axios({
        url: `https://6299ab256f8c03a97846c3c5.mockapi.io/teachers/${id}`,
        method: "DELETE",
      });
    };
  
    this.addTeacherApi = function (teacher) {
      return axios({
        url: "https://6299ab256f8c03a97846c3c5.mockapi.io/teachers",
        method: "POST",
        data: teacher,
      });
    };
  
    this.getTeacherById = function (id) {
      return axios({
        url: `https://6299ab256f8c03a97846c3c5.mockapi.io/teachers/${id}`,
        method: "GET",
      });
    };
  
    this.updateTeacherApi = function (teacher) {
      return axios({
        url: `https://6299ab256f8c03a97846c3c5.mockapi.io/teachers/${teacher.id}`,
        method: "PUT",
        data: teacher,
      });
    };
  }
  