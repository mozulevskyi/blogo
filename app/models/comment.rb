class Comment < ApplicationRecord
  belongs_to :post
  # validates :author, presence: true,
  #           length: { minimum: 2 }
  #
  # validates :content, presence: true
  # validates_each :author do |record, attr, value|
  #   record.errors.add(attr, 'must start with upper case ') if value =~ /\A[[:lower:]]/
  # end
  #
  # validates_each :author do |record, attr, value|
  #   record.errors.add(attr, 'second word must also start with upper case ') if value.split[1] =~ /\A[[:lower:]]/
  # end
  #
  # validate :name_has_enough_words
  #
  # def name_has_enough_words
  #   return if author.blank?
  #   errors.add(:author, "must be at least 2 words") if author.split.size < 2
  # end
end
