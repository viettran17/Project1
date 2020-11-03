function home() {
    const res = GetRes("I-RateRes")
    res.onsuccess = (event) => {
        const results = event.target.result
        for (var i in results.reverse()) {
            let html = `
            <li>
                <div class="card-group vgr-cards">
                <div class="card">
                <div class="card-img-body">
                    <img class="card-img" src="${results[i].image}" alt="Card image cap" height="200px" width="380px">
                </div>
                <div class="card-body">
                    <h4 class="card-title">${results[i].Restaurant_Name}</h4>
                    <p class="card-text">${results[i].Restaurant_Type}</p>
                    <a href="#" class="btn btn-outline-primary">Delete</a>
                </div>
                </div><br>
            </li>
            `
            $('#listrest').append(html);
            $('#filter').append(html);
        }
    }
}
$(window).on("load", function () {
    home()
});

$(document).ready(function () {
    $('#home').on('click', () => {
        $('#listrest').empty()
        home()
    })
    // $("form[name='rate']").validate({
    //     rules: {
    //         Restaurant_Name: {
    //             required: true
    //         },
    //         Restaurant_Type: {
    //             required: true
    //         },
    //         Restaurant_Address: {
    //             required: true
    //         },
    //         Service_Rate: {
    //             required: true,
    //             number: true,
    //         },
    //         Clean_Rate: {
    //             required: true,
    //             number: true
    //         },
    //         Food_Rate: {
    //             required: true,
    //             number: true
    //         },
    //         Date: {
    //             required: true,
    //         },

    //     },
    //     messages: {
    //         Restaurant_Name: {
    //             required: "Please enter restaurant name."
    //         },
    //         Restaurant_Type: {
    //             required: "Please enter your restaurant type"
    //         },
    //         Restaurant_Address: {
    //             required: "Please enter restaurant address"
    //         },
    //         Service_Rate: {
    //             required: "Please choose service rate"
    //         },
    //         Clean_Rate: {
    //             required: "Please choose clean rate"
    //         },
    //         Food_Rate: {
    //             required: "Please choose food rate"
    //         },
    //         Date: {
    //             required: "Please choose the date you visited"
    //         },
    //     },
    //     errorPlacement: function (error, element) {
    //         error.appendTo(element.parent().prev());
    //     },
    //     submitHandler: function () {
    //         const rate = {
    //             Restaurant_Name: $('#Restaurant_Name').val(),
    //             Restaurant_Type: $('#Restaurant_Type').val(),
    //             Restaurant_Address: $('#Restaurant_Address').val(),
    //             Service_Rate: $('#Service_Rate').val(),
    //             Clean_Rate: $('#Clean_Rate').val(),
    //             Food_Rate: $('#Food_Rate').val(),
    //             Date: $('#Date').val(),
    //             notes: $('#notes').val(),
    //         }
    //         addData("I-RateRes", rate)
    //         return false
    //     }
    // });

    $(document).on('click', '#DeleteRes', function () {
        const rateid = $(this).attr("rateId")
        const result = DeleteRes(Number(rateid))
        result.onsuccess = function () {
            $('#listrest').empty()
            navigator.notification.beep(1);
            navigator.vibrate(100)
            home()
        }
    })
    $(document).on('click', '#GetDetailsRes', function () {
        const rateId = $(this).attr("rateId")
        const result = GetDetails(rateId)
        result.onsuccess = function (event) {
            $(location).attr('href', "#detail")
            const Restaurant_Detail = event.target.result
            const html = `
            <div class="card ml-2 mt-4" style="width: 21.5rem;">
                    <div class="card-body">
                      <h4 class="card-title">${Restaurant_Detail.Restaurant_Name}</h4>
                      <p>${Restaurant_Detail.Restaurant_Address}</p>
                      <h6 class="card-subtitle mb-2 text-muted">${Restaurant_Detail.Restaurant_Type}</h6>
                      <p>${Restaurant_Detail.Date}</p>
                      <p>Average meal price per person ${Restaurant_Detail.Price} $</p>
                      <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #66ff66">
                          <b style="background-color: #66ff66">Service</b>
                          <div class="ml-1"><span>${Restaurant_Detail.Service_Rate}</span><span class="fa fa-star checked"></span></div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #4dd2ff">
                          <b style="background-color: #4dd2ff">Clean</b>
                          <div class="ml-1"><span>${Restaurant_Detail.Clean_Rate}</span><span class="fa fa-star checked"></span></div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #9966ff">
                          <b style="background-color: #9966ff">Food</b>
                          <div class="ml-1"><span>${Restaurant_Detail.Food_Rate}</span><span class="fa fa-star checked"></span></div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #ffcc66; width:100%;">
                          <b style="background-color: #ffcc66">Average</b>
                          <div class="ml-1"><span>${parseFloat((Number(Restaurant_Detail.Food_Rate) + Number(Restaurant_Detail.Clean_Rate) + Number(Restaurant_Detail.Service_Rate)) / 3).toFixed(1)}</span><span class="fa fa-star checked"></span></div>
                      </li>
                  </ul>
                  <div>
                    <span>Note</span>
                        <div class="note">
                            ${Restaurant_Detail.Note}
                        </div>
                  </div>
                </div>
            </div>  `
            $('#detailContent').empty().append(html)
        }
    })
})