class WishesController < ApplicationController
  def index
    @wishes = Wish.all.order(created_at: :desc).limit(20)
    render json: @wishes if request.xhr?
  end

  def create
    colors = ["#fc4949", "#5684f7", "#58f4cd", "#f28557", "#fc7e7e", "#bf68f9"];

    @wish = Wish.new(text: params[:wish])
    @wish.color = colors.sample
    if @wish.save
      render json: @wish
    else
      @wish = Wish.where(text: params[:wish]).first
      @wish.votes += 1
      @wish.save
      render json: @wish
    end
  end

  def upvote
    @wish = Wish.where(id: params[:id]).first
    @wish.votes += 1
    @wish.save
    render json: @wish.votes
  end

  def downvote
    @wish = Wish.where(id: params[:id]).first
    @wish.votes -= 1
    @wish.save
    render json: @wish.votes
  end

  def search
    @wishes = Wish.where("lower(text) LIKE ?", "%#{params[:phrase]}%")
    render json: @wishes
  end

  def top_ten
    @wishes = Wish.all.order(votes: :desc).limit(10)
    render json: @wishes if request.xhr?
  end

  def todays_top_ten
    @wishes = Wish.where("created_at > ?", DateTime.now.beginning_of_day).order(votes: :desc).limit(10)
    render json: @wishes if request.xhr?
  end
end
