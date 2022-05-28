const faces = [];

const renderFaces = function () {
  $('.faces').empty();

  const source = $('#faces-template').html();
  const template = Handlebars.compile(source);

  for (let i = 0; i < faces.length; i += 1) {
    const newHTML = template(faces[i]);
    $('.faces').append(newHTML);
  }
};

const addToFaces = function (faceData) {
  faces.push({
    login: faceData.author.login,
    avatar_url: faceData.author.avatar_url,
  });

  renderFaces();
};

const fetch = function (query) {
  $.ajax({
    method: 'GET',
    url: `https://api.github.com/repos/facebook/react/commits/${query}`,
    dataType: 'json',
    success(data) {
      addToFaces(data);
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
};

$('.search').on('click', () => {
  const search = $('#search-query').val();

  fetch(search);

  $('#search-query').val('');
});
