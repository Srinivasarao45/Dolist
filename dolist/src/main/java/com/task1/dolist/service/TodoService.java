package com.task1.dolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task1.dolist.repository.TodoRepository;
import com.task1.dolist.model.Todo;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }

    public List<Todo> getTodaysProgress() {
        // Custom query to get today's progress
        return todoRepository.findByDueDateAndStatus(new java.util.Date(), Todo.Status.Completed);
    }
}
