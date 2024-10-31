from enum import Enum
import random
from collections import deque
from queue import PriorityQueue
import json

# [Previous Position and Color classes remain the same]

class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Position(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        if not isinstance(other, Position):
            return False
        return self.x == other.x and self.y == other.y
    
    def __hash__(self):
        return hash((self.x, self.y))
    
    def manhattan_distance(self, other):
        return abs(self.x - other.x) + abs(self.y - other.y)

class Color(Enum):
    RED = 'red'
    BLUE = 'blue'
    GREEN = 'green'
    YELLOW = 'yellow'

class GameState:
    # [Previous GameState methods remain the same]
    def __init__(self, pieces, goals, obstacles, grid_size=7):
        self.pieces = pieces
        self.goals = goals
        self.obstacles = obstacles
        self.grid_size = grid_size
    
    def is_valid_position(self, pos):
        return (0 <= pos.x < self.grid_size and 
                0 <= pos.y < self.grid_size and 
                pos not in self.obstacles)
    
    def is_goal_state(self):
        return all(self.pieces[color] == self.goals[color] for color in Color)
    
    def get_piece_at(self, pos):
        for color, piece_pos in self.pieces.items():
            if piece_pos == pos:
                return color
        return None
    
    def is_connected_configuration(self):
        if not self.pieces:
            return True
            
        start_pos = next(iter(self.pieces.values()))
        visited = {start_pos}
        queue = deque([start_pos])
        
        directions = [Position(0, 1), Position(1, 0), Position(0, -1), Position(-1, 0)]
        
        while queue:
            current = queue.popleft()
            for direction in directions:
                neighbor = current + direction
                if (neighbor in self.pieces.values() and 
                    neighbor not in visited):
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return len(visited) == len(self.pieces)

    def get_valid_moves(self):
        valid_moves = []
        directions = [Position(0, -2), Position(2, 0), Position(0, 2), Position(-2, 0)]
        
        for color in Color:
            current_pos = self.pieces[color]
            
            for direction in directions:
                new_pos = current_pos + direction
                middle_pos = Position(
                    current_pos.x + direction.x // 2,
                    current_pos.y + direction.y // 2
                )
                
                new_pieces = dict(self.pieces)
                new_pieces[color] = new_pos
                new_state = GameState(new_pieces, self.goals, self.obstacles, self.grid_size)
                
                if (self.is_valid_position(new_pos) and
                    self.get_piece_at(middle_pos) is not None and
                    middle_pos not in self.obstacles and
                    self.get_piece_at(new_pos) is None and
                    new_state.is_connected_configuration()):
                    valid_moves.append((color, new_pos))
                    
        return valid_moves

def find_all_reachable_positions(initial_state, max_depth=30):
    """
    Find all positions that can be reached by any piece using leap-frog movements.
    Uses a BFS approach to explore all possible game states up to max_depth.
    """
    reachable = set()
    visited_states = set()
    queue = deque([(initial_state, 0)])  # (state, depth)
    
    while queue:
        current_state, depth = queue.popleft()
        
        if depth > max_depth:
            continue
            
        # Add all current piece positions to reachable
        for pos in current_state.pieces.values():
            reachable.add(pos)
        
        # Get state hash for visited check
        state_hash = frozenset((color.value, pos.x, pos.y) 
                             for color, pos in current_state.pieces.items())
        
        if state_hash in visited_states:
            continue
            
        visited_states.add(state_hash)
        
        # Explore all valid moves from this state
        for color, new_pos in current_state.get_valid_moves():
            new_pieces = dict(current_state.pieces)
            new_pieces[color] = new_pos
            new_state = GameState(
                new_pieces,
                current_state.goals,
                current_state.obstacles,
                current_state.grid_size
            )
            queue.append((new_state, depth + 1))
    
    return reachable

def generate_level(grid_size=7, num_obstacles=2):
    """Generate a valid puzzle level with verified reachable goals."""
    center = grid_size // 2
    initial_pieces = {
        Color.RED: Position(center-1, center-1),
        Color.BLUE: Position(center, center-1),
        Color.GREEN: Position(center-1, center),
        Color.YELLOW: Position(center, center)
    }
    
    # First, find all reachable positions with leap-frog movements
    initial_state = GameState(initial_pieces, {}, set(), grid_size)
    reachable_positions = find_all_reachable_positions(initial_state)
    
    # Remove starting positions from available goal positions
    available_positions = reachable_positions - set(initial_pieces.values())
    
    if len(available_positions) < len(Color):
        raise Exception("Not enough reachable positions for goals")
    
    # Try to place goals in a connected configuration from reachable positions
    max_attempts = 100
    for attempt in range(max_attempts):
        # Choose positions for goals that are close to each other
        goals = {}
        temp_available = list(available_positions)
        
        # Start with a random reachable position
        first_pos = random.choice(temp_available)
        goals[Color.RED] = first_pos
        temp_available.remove(first_pos)
        
        # Place remaining goals nearby
        placed_all = True
        for color in list(Color)[1:]:
            # Find positions adjacent to existing goals
            candidates = []
            for existing_pos in goals.values():
                for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                    neighbor = Position(existing_pos.x + dx, existing_pos.y + dy)
                    if neighbor in temp_available:
                        candidates.append(neighbor)
            
            if not candidates:
                placed_all = False
                break
                
            # Choose a random adjacent position
            next_pos = random.choice(candidates)
            goals[color] = next_pos
            temp_available.remove(next_pos)
        
        if not placed_all:
            continue
        
        # Verify the goal configuration is valid
        goal_state = GameState(goals, goals, set(), grid_size)
        if goal_state.is_connected_configuration():
            # Create state without obstacles and verify solvability
            state_without_obstacles = GameState(initial_pieces, goals, set(), grid_size)
            if find_solution(state_without_obstacles, max_depth=30):
                # Add obstacles and verify final solvability
                obstacles = generate_valid_obstacle_positions(state_without_obstacles, num_obstacles)
                final_state = GameState(initial_pieces, goals, obstacles, grid_size)
                if find_solution(final_state, max_depth=30):
                    return final_state
    
    raise Exception("Could not generate valid level after max attempts")

# [Previous helper functions remain the same]

def calculate_state_score(state):
    score = 0
    for color in Color:
        score += state.pieces[color].manhattan_distance(state.goals[color])
    
    if not state.is_connected_configuration():
        score += 1000
    
    for color in Color:
        if state.pieces[color] == state.goals[color]:
            score -= 10
            
    return score

def generate_valid_obstacle_positions(state, num_obstacles):
    obstacles = set()
    available_positions = {
        Position(x, y)
        for x in range(state.grid_size)
        for y in range(state.grid_size)
    } - set(state.pieces.values()) - set(state.goals.values())
    
    while len(obstacles) < num_obstacles and available_positions:
        pos = random.choice(list(available_positions))
        
        test_state = GameState(state.pieces, state.goals, obstacles | {pos}, state.grid_size)
        if find_solution(test_state, max_depth=20):
            obstacles.add(pos)
            
        available_positions.remove(pos)
    
    return obstacles

# [Previous find_solution, print_level, and state_to_json functions remain the same]

def find_solution(state, max_depth=20):
    class Node:
        def __init__(self, state, parent, g):
            self.state = state
            self.parent = parent
            self.g = g
            self.h = calculate_state_score(state)
            self.f = self.g + self.h
        
        def __lt__(self, other):
            return self.f < other.f
    
    start_node = Node(state, None, 0)
    frontier = PriorityQueue()
    frontier.put((start_node.f, id(start_node), start_node))
    
    visited = set()
    
    while not frontier.empty():
        current_node = frontier.get()[2]
        
        if current_node.state.is_goal_state():
            path = []
            while current_node:
                path.append(current_node.state)
                current_node = current_node.parent
            return list(reversed(path))
            
        state_hash = frozenset((color.value, pos.x, pos.y) 
                             for color, pos in current_node.state.pieces.items())
                             
        if state_hash in visited or current_node.g >= max_depth:
            continue
            
        visited.add(state_hash)
        
        for color, new_pos in current_node.state.get_valid_moves():
            new_pieces = dict(current_node.state.pieces)
            new_pieces[color] = new_pos
            new_state = GameState(
                new_pieces,
                current_node.state.goals,
                current_node.state.obstacles,
                current_node.state.grid_size
            )
            
            new_node = Node(new_state, current_node, current_node.g + 1)
            frontier.put((new_node.f, id(new_node), new_node))
    
    return []

def print_level(state):
    for y in range(state.grid_size):
        for x in range(state.grid_size):
            pos = Position(x, y)
            if pos in state.obstacles:
                print('X', end=' ')
            elif piece_color := state.get_piece_at(pos):
                print(piece_color.value[0].upper(), end=' ')
            elif pos in state.goals.values():
                color = next(c for c, p in state.goals.items() if p == pos)
                print(color.value[0].lower(), end=' ')
            else:
                print('.', end=' ')
        print()

def state_to_json(state):
    return {
        "pieces": [
            {"x": state.pieces[color].x, "y": state.pieces[color].y, "color": color.value}
            for color in Color
        ],
        "goals": [
            {"x": state.goals[color].x, "y": state.goals[color].y, "color": color.value}
            for color in Color
        ],
        "obstacles": [
            {"x": obs.x, "y": obs.y}
            for obs in state.obstacles
        ]
    }

# Run the generator
while True:
    try:
        print("Generating level...")
        level = generate_level()
        print("Generated Level:")
        print("\nInitial State:")
        print_level(level)
        
        solution = find_solution(level)
        if solution:
            print(f"\nSolution found in {len(solution) - 1} moves!")
            print("\nSolution path:")
            for i, state in enumerate(solution):
                print(f"\nStep {i}:")
                print_level(state)
            
            print("\nJSON Format:")
            print(json.dumps(state_to_json(level), indent=4))
            break
        else:
            print("\nNo solution found - retrying")
    except Exception as e:
        print(f"Generation failed: {e} - retrying")
