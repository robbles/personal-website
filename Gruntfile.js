module.exports = configure;

function configure(grunt) {

  // Project configuration.
  var gruntConfig = {
    options: {},

    pkg: {
      version: '0.4.0'
    },

    watch: {
      options: {
        livereload: 35729
      },

      less: {
        files: ['less/*.less'],
        tasks: ['less']
      },

      html: {
        files: ['*.html'],
        tasks: ['livereload']
      }
    },

    less: {
      all: {
        files: {
          "css/style.css": "less/style.less"
        }
      }
    }
      
  };

  grunt.initConfig(gruntConfig);

  // 3rd party tasks from NPM
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Aliases
  grunt.registerTask('default', ['watch']);
}
