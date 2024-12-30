'use client'

import React, { useState } from "react";

interface Comment {
  id: number;
  text: string;
  timestamp: string;
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject: Comment = {
        id: Date.now(),
        text: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setEditingComment(id);
      setEditText(commentToEdit.text);
    }
  };

  const handleSaveEdit = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, text: editText } : comment
      )
    );
    setEditingComment(null);
    setEditText("");
  };

  return (
    <div className="comment-section p-6 bg-accentDarkSecondary rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-4 ">Comments</h2>

      {/* Add Comment */}
      <div className="add-comment mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="border rounded-md p-2 w-full h-20 resize-none"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 font-semibold border-2 border-dark  text-light hover:text-dark uppercase transition-all duration-150 ease-linear bg-dark hover:bg-light rounded-lg"
        >
          Add Comment
        </button>
      </div>

      {/* List Comments */}
      <div className="comments-list space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="comment bg-white dark:bg-dark  p-4 rounded-md shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  {comment.timestamp}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="text-cyan-500 hover:underline rounded-md border-accentDarkSecondary border-2 mt-2 px-2 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:underline rounded-md border-accentDarkSecondary border-2 mt-2 px-2 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {editingComment === comment.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border rounded-md p-2 w-full h-16 resize-none"
                  />
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingComment(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 dark:text-light">{comment.text}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
