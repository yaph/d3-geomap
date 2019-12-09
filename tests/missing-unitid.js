module.exports = {
    'missing-unitid test': browser => {
        browser
            .url('http://localhost:8000/examples/missing-unitid.html')
            .waitForElementVisible('#map svg')
            .assert.visible('.unit-')
            .assert.cssProperty('.unit-', 'fill', 'rgb(0, 0, 0)')
            .end();
    }
};