$(document).ready(function(){

    $(".uuid").click(function()
    {
        var version = $(this).attr('name')
        var uuid = {version: version}

        $.ajax({
            type: 'POST',
            url: '/uuid', 
            data: uuid,
            success: function(data) 
            {
              if(data['success'] == true)
                $("input[rel='"+version+"']" ).val(data['uuid']);
            },
            error: function(e) {
                alert("Error" + e);
            }
        });
    });
    
  });