module.exports = {
    'data-array test': browser => {
        browser
            .url('http://localhost:8000/examples/data-array.html')
            .waitForElementVisible('#map svg')
            .assert.visible('.unit-ESP')
            .assert.attributeContains('.unit-ESP', 'style', 'rgb(255, 247, 236)')
            .end();
    }
};