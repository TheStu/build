class ImagesController < ApplicationController

  def create
    @image = Image.new(image_params)

    if @image.save
      render json: { data: {link: @image.image.file.url} }
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.permit(:image, :book_id)
    end
end
