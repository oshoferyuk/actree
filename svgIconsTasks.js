module.exports = {
    initTasks: function initTasks(grunt, destDir, setsConstantPath, setsConstantModule)
    {
        const fs = require('fs');
        const path = require('path');

        const svgConfigConst = {};

        const rootBundleName = 'root';
        const iconColorClassPart = 'u-icon-color-';
        const iconColorUniqClassRegExp = new RegExp('(?:[^\\s"\']*?(' + iconColorClassPart + '))', 'ig');

        const srcBaseDir = path.resolve(__dirname, '..', '..', 'Design', 'svg');
        const destBaseDir = path.resolve(destDir, 'Svg');
        const options = {
            "dest": destDir,
            "shape": {
                id: {
                    // @link https://github.com/gulpjs/vinyl
                    // @link https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md#shape-ids
                    generator: function (name, file)
                    {
                        // file.stem --> file name without its extension
                        return normalizeSvgItemName(file.stem);
                    }
                },

                transform: [
                    {
                        setUniqueNameSpace:
                            /**
                             * @link https://github.com/jkphl/svg-sprite/blob/HEAD/docs/configuration.md#custom-callback-transformation-function-values
                             * @link https://github.com/jkphl/svg-sprite/blob/6966592489dfcf2cd9ed2bba500cb8ee31c00b9c/lib/svg-sprite/shape.js#L708
                             * @desc Custom callback transformation:: set unique name-space for internal (for each svg) id-s and classe-s
                             * @param {SVGShape} shape SVG shape object
                             * @param {SVGSpriter} spriter SVG spriter
                             * @param {Function} callback Callback
                             * @return {void}
                             */
                            function (shape, spriter, callback)
                            {
                                shape.complement(function ()
                                {
                                    shape.setNamespace('svg-icon__' + shape.base + '__');
                                });
                                callback(null);
                            }
                    }
                ]
            },
            svg: {
                transform: [
                    // theme class names recovery
                    // When svg-sprite was working -- class names were changed to be unique.
                    // It is need to recover special (theme's) class names to the origin state.
                    function (svg)
                    {
                        return svg.replace(iconColorUniqClassRegExp, '$1');
                    }
                ]
            }
        };

        let svgSpriteConfiguration = {};

        // scan && collect directory from the 'destBaseDir'
        const srcBaseDirContent = fs.readdirSync(srcBaseDir);
        let destBaseDirContent = null;
        try { destBaseDirContent = fs.readdirSync(destBaseDir); }
        catch (e) { }

        let isRootDone = false;
        for (let i = 0; i < srcBaseDirContent.length; i++)
        {
            const itemName = srcBaseDirContent[i];
            let srcSetDirPath = path.resolve(srcBaseDir, itemName);
            const itemStat = fs.statSync(srcSetDirPath);

            if (itemStat.isFile() && (true === isRootDone)) { continue; }

            let srcSetDirContent = itemStat.isFile() ?
                srcBaseDirContent : fs.readdirSync(srcSetDirPath);;
            let bundleName;
            let svgSetDirectory;

            if (itemStat.isFile())
            {
                isRootDone = true;
                srcSetDirPath = srcBaseDir;
                bundleName = rootBundleName;
                svgSetDirectory = '';
            }
            else
            {
                // recognize 'Original' svg set
                bundleName = itemName;
                svgSetDirectory = 'Original' === itemName.substring(itemName.length - 8) ?
                    itemName.substring(0, itemName.length - 8) + '-original' :
                    itemName;
            }

            svgConfigConst[bundleName] = buildSetConfig(itemStat, srcSetDirPath, srcSetDirContent);

            // check if the bundle exists
            if ((null != destBaseDirContent) && (-1 !== destBaseDirContent.indexOf(bundleName + '.svg')))
            {
                // compare 'mtimeMS' (time of changes) of the bundle and latest svg
                const bundlePath = path.resolve(destBaseDir, bundleName + '.svg');


                if (!hasSrcSetChanges(srcSetDirContent, srcSetDirPath, bundlePath))
                {
                    // console.info(`"${itemName}" bundle has not been changed`);
                    continue;
                }
            }

            const iconSetConfig = Object.create(options);
            iconSetConfig.mode = {
                "stack": {
                    dest: "Svg",
                    sprite: bundleName
                }
            };

            svgSpriteConfiguration[bundleName] = {
                expand: true,
                cwd: path.resolve(srcBaseDir, svgSetDirectory),    // <-- Set to your SVG base directory,
                dest: destDir,                  // <-- IconsMain output directory
                src: ['*.svg'],                 // <-- Glob to match your SVG files
                options: iconSetConfig
            }
        }

        // console.info('---');

        if (!Object.keys(svgSpriteConfiguration).length)
        {
            // if all bundles have not changed, create fake config to prevent 'grunt-svg-sprite' plugin error
            svgSpriteConfiguration['noop'] = {
                expand: true,
                cwd: srcBaseDir,
                dest: destDir,
                src: ['*.noop'],
            }
        }

        grunt.config('svg_sprite', svgSpriteConfiguration);

        // ngconstant -------
        /** @link https://www.npmjs.com/package/grunt-ng-constant **/
        grunt.config('ngconstant.svgConstant', {
            options: {
                name: setsConstantModule,
                deps: false,
                wrap: true,
                dest: setsConstantPath,
            },
            constants: function ()
            {
                const svgConfigConstName = path.parse(setsConstantPath).name.replace('.constant', '');
                const obj = {};
                obj[svgConfigConstName] = svgConfigConst;
                return obj;
            }
        });
        // ngconstant END ==========

        grunt.loadNpmTasks('grunt-ng-constant');
        grunt.loadNpmTasks('grunt-svg-sprite');

        grunt.registerTask('svg-sprite', ['svg_sprite', 'ngconstant:svgConstant']);

        return 'svg-sprite';

        /**
         * @name normalizeSvgItemName
         * @desc bundle (icon-set) name should be same as *.svg file name (without expansion)
         * it can not be started by number:: adding '_' in the first position
         * it can not be started by 0 if it is number:: doing parseInt()
         * @param {string} stem -- file name without expansion
         * @return {string}
         */
        function normalizeSvgItemName(stem)
        {
            // parseInt to normalize file names kind of 001.svg, 070.svg
            stem = stem.trim();
            return isNaN(stem) ? stem : '_' + parseInt(stem, 10);
        }

        /**
         * @name buildSetConfig
         * @param {Object} itemStat fs.stat()
         * @param {String} srcSetDirPath -- path to the SVG icons sources directory (folder contains the *.svg files)
         * @param {String[]} srcSetDirContent -- list of *.svg files which places in the source directory
         * if the Bundle now is 'root' srcSetDirContent cold be directories and files *.svg
         * @return {<bundle-name> : {size: number|null, icons: {<icon-name>: {size, width, height}}}}
         */
        function buildSetConfig(itemStat, srcSetDirPath, srcSetDirContent)
        {
            const svgConfigConst = {size: null};
            if (itemStat.isFile())
            {
                svgConfigConst.icons = getSetItemsDefs(srcSetDirPath, srcSetDirContent);
            }
            if (itemStat.isDirectory())
            {
                svgConfigConst.icons = getSetItemsDefs(srcSetDirPath, srcSetDirContent);
                for (let iconsKey in svgConfigConst.icons)
                {
                    if (!svgConfigConst.icons.hasOwnProperty(iconsKey))
                    {
                        continue;
                    }

                    const currIconSizeDefs = svgConfigConst.icons[iconsKey];
                    if ((null == currIconSizeDefs.size) && (null == currIconSizeDefs.width))
                    {
                        continue;
                    }

                    Object.assign(svgConfigConst, currIconSizeDefs);
                    break;
                }
            }
            return svgConfigConst;

            function getSetItemsDefs(srcSetDirPath, srcSetDirContent)
            {
                const icons = {};
                srcSetDirContent.forEach(function (svgItemName)
                {
                    const iconKey = normalizeSvgItemName(svgItemName.trim().replace('.svg', ''));
                    const svgItemPath = path.resolve(srcSetDirPath, svgItemName)
                    const svgItemStat = fs.statSync(svgItemPath);
                    if (!svgItemStat.isFile()) { return null; }
                    icons[iconKey] = getSetSizeDefs(svgItemPath);
                });
                return icons;
            }
        }


        /**
         * @name getSetSizeDefs
         * @desc getting information about size of the SVG icon by its content (from 'viewBox' attr)
         * @param {String} fileContent -- content of the file
         * @return {{size: number|null}|{size: null, width: number|undefined, height: number|undefined}}
         * @private
         */
        function getSetSizeDefs(filePath)
        {
            const fileContent = grunt.file.read(filePath);
            const match = fileContent.match(/viewBox\s?=\s?['"]\d+[\s,]\d+[\s,](\d+)[\s,](\d+)['"]/i);
            if (match)
            {
                const width = parseInt(match[1], 10);
                const height = parseInt(match[2], 10);
                if (width === height)
                {
                    return { size: width };
                }
                return { width, height, size: null };
            }
            return { size: null }
        }

        /**
         * @name hasSrcSetChanges
         * @desc check:: at least one file from the set have been changed later than the the bundle had been created
         * @param {String[]} srcSetDirContent -- names of the Set directory items
         * @param {String} srcSetDirPath
         * @param {String} bundlePath
         * @return {boolean}
         * @private
         */
        function hasSrcSetChanges(srcSetDirContent, srcSetDirPath, bundlePath)
        {
            // walkING through src svg set directory
            for (let i = 0; i < srcSetDirContent.length; i++)
            {
                // check if current item exists by path
                const svgSrcFilePath = path.resolve(srcSetDirPath, srcSetDirContent[i]);
                if (!fs.existsSync(svgSrcFilePath)) { continue; }

                // check if current item is file
                const srcSvgStat = fs.statSync(svgSrcFilePath);
                if (!srcSvgStat.isFile()) { continue; }

                const svgSrcFileMTime = srcSvgStat.mtimeMs;
                const bundleMTime = fs.statSync(bundlePath).mtimeMs;
                if (svgSrcFileMTime > bundleMTime)
                {
                    return true;
                }
            }
            return false;
        }
    }
};
