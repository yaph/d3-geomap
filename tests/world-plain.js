module.exports = {
    'world-plain test': browser => {
        browser
            .url('http://localhost:8000/examples/world-plain.html')
            .waitForElementVisible('#map svg')
            .assert.titleContains('Map')
            .assert.visible('.unit-ESP')
            .end();
    }
};