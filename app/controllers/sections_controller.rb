class SectionsController < ApplicationController

  before_action :set_section, only: [:update, :destroy, :change_index]

  def create
    @section = Section.new(section_params)
    if @section.save
      render json: @section
    else
      render json: @section.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @target_section = Section.find(params[:order_index])
    @old_index = @section.order_index
    if @section.update(section_params) && @target_section.update(order_index: @old_index)
      render json: @section
    else
      render json: @section.errors.full_messages + @target_section.errors.full_messages, status: :unprocessable_entity
    end
  end

  def change_index
    if @section.update(section_params)
      render json: @section
    else
      render json: @section.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @section.destroy
    head :ok
  end

  private

    def set_section
      @section = Section.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def section_params
      params.require(:section).permit(:title, :body, :book_id, :order_index)
    end
end
