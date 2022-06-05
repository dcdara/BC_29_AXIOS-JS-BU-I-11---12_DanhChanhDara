function Services() {
    this.getListTeacherAPI = function () {
        return axios({
            url: "https://6299ab256f8c03a97846c3c5.mockapi.io/teachers",
            method: "GET",
            
        })
            
    }
}
