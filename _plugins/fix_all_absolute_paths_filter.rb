module FixAllAbsolutePathsFilter
  def fix_all_absolute_paths(input, baseurl)
    if input.is_a?(Hash)
      input.transform_values { |value|
      fix_all_absolute_paths(value, baseurl)
    }
    elsif input.is_a?(Array)
      input.map { |value| fix_all_absolute_paths(value, baseurl) }
    else
      get_nav_url(input, baseurl)
    end
  end

  def get_nav_url(path, baseurl)
    pre2 = path.slice(0, 2)
    pre7 = path.slice(0, 7)
    pre8 = path.slice(0, 8)

    if pre2 == "//" || pre7 == "http://" || pre8 == "https://"
      path
    else
      prepend_base_url(path, baseurl)
    end
  end

  def prepend_base_url(path, baseurl)
    prepend_path(path.gsub("index.html", ""), baseurl)
  end

  def prepend_path(path, prepend_path)
    (prepend_path + "/" + path).gsub("///", "/").gsub("//", "/")
  end
end

Liquid::Template.register_filter(FixAllAbsolutePathsFilter)