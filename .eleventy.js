module.exports = async function(eleventyConfig) {
    const { IdAttributePlugin } = await import("@11ty/eleventy");

    // De-index.html the output
    eleventyConfig.addGlobalData("permalink", () => {
      return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/js");

    // Filters

    eleventyConfig.addFilter("UTC", function(val) {
      return new Date(val).toLocaleDateString("en-CA", {
        timeZone: "UTC"
      });
    });

    // Plugins

    eleventyConfig.addPlugin(IdAttributePlugin, {

		decodeEntities: true,
		checkDuplicates: "error",
		slugify: eleventyConfig.getFilter("slugify"),

      filter: function({ page }) {
        if(page.inputPath.endsWith(".md")) {
          return true;
        }

        return false;
      }
    });

    return {
      passthroughFileCopy: true,
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
      dir: {
        input: "src",
        output: "public",
        includes: "_includes",
      },
    };
}