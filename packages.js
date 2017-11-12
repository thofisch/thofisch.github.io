(function() {
  packages = {
    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      function find(name, data) {
        var node = map[name];
        var i;

        if (!node) {
          node = map[name] = data || { name: name, children: [] };
          if (name.length) {
            const fn = name.substring(0, (i = name.indexOf(".")));
            const parent = find(fn);
            node.parent = parent;
            if (!node.parent.children) {
              node.parent.children = [];
            }
            node.parent.children.push(node);
            node.key = name.replace(/\./g, "_");
            // node.key = name.substring(i + 1);
            node.title = name.substring(name.indexOf(".") + 1);
          }
        }
        return node;
      }

      classes.forEach(function(d) {
        // map[name] = { name: d.name, imports: d.imports, children: [] };
        find(d.name, d);
      });

      return map[""];
    },

    // Return a list of imports for the given array of nodes.
    imports: function(nodes) {
      var map = {};
      var imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        // imports.push({ source: map[d.name], target: map[i] });
        if (d.name == "flare.SeaBook.CashStatementService") {
          console.log(d);
          // imports.push({ source: map[d.name], target: null });
        }
        if (d.imports)
          d.imports.forEach(function(i) {
            imports.push({ source: map[i], target: map[d.name] });
            // imports.push({ source: map[d.name], target: map[i] });
          });
      });

      // console.log(imports);

      return imports;
    }
  };
})();
