module ApplicationHelper

	def full_title(page_title) #Returns the full title on a per-page basis.
	  base_title = "Build"
	  if page_title.empty?
	  	"#{base_title} | Build a Perfect Book Interior"
	  else
	    "#{page_title} | #{base_title}"
	  end
	end

	def meta_desc(desc) #Returns the full title on a per-page basis.
	  if desc.empty?
	    "Readers appreciate a great book interior. Use Book Build to easily and seamlessly create a memorable experience for your readers."
	  else
	    desc
	  end
	end

end
